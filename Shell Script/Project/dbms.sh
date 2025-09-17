#!/bin/bash

DB_ROOT="./DBMS_DB"

mkdir -p "$DB_ROOT"

main_menu() {
  while true; do
    echo ""
    echo "--- Main Menu ---"
    echo "1. Create Database"
    echo "2. List Databases"
    echo "3. Connect To Database"
    echo "4. Drop Database"
    echo "5. Exit"
    read -p "Choose [1-5]: " choice
    case $choice in
      1) create_database ;;
      2) list_databases ;;
      3) connect_database ;;
      4) drop_database ;;
      5) exit 0 ;;
      *) echo "Invalid option." ;;
    esac
  done
}

create_database() {
  read -p "Enter Database Name: " db_name
  if [ -z "$db_name" ]; then
    echo "Name cannot be empty."
  elif [ -d "$DB_ROOT/$db_name" ]; then
    echo "Already exists."
  else
    mkdir "$DB_ROOT/$db_name"
    echo "Database created."
  fi
}

list_databases() {
  echo "--- Database List ---"
  ls "$DB_ROOT"
}

connect_database() {
  list_databases
  read -p "Enter Database Name to Connect: " db_name
  if [ ! -d "$DB_ROOT/$db_name" ]; then
    echo "Database not found."
    return
  fi
  table_menu "$db_name"
}

drop_database() {
  read -p "Enter Database Name to Delete: " db_name
  if [ -d "$DB_ROOT/$db_name" ]; then
    rm -rf "$DB_ROOT/$db_name"
    echo "Database deleted."
  else
    echo "Database not found."
  fi
}

table_menu() {
  local db="$1"
  while true; do
    echo ""
    echo "--- [$db] Table Menu ---"
    echo "1. Create Table"
    echo "2. List Tables"
    echo "3. Drop Table"
    echo "4. Insert Into Table"
    echo "5. Select From Table"
    echo "6. Delete From Table"
    echo "7. Update Table"
    echo "8. Back"
    read -p "Choose [1-8]: " tchoice
    case $tchoice in
      1) create_table "$db" ;;
      2) list_tables "$db" ;;
      3) drop_table "$db" ;;
      4) insert_into_table "$db" ;;
      5) select_from_table "$db" ;;
      6) delete_from_table "$db" ;;
      7) update_table "$db" ;;
      8) break ;;
      *) echo "Invalid option." ;;
    esac
  done
}

create_table() {
  local db="$1"
  read -p "Enter Table Name: " tname
  tfile="$DB_ROOT/$db/$tname"
  meta="$tfile.meta"
  
  if [ -f "$tfile" ]; then
    echo "Table already exists."
    return
  fi

  read -p "Columns number: " cols
  if ! [[ "$cols" =~ ^[0-9]+$ ]] || [ "$cols" -lt 1 ]; then
    echo "Invalid columns number."
    return
  fi

  declare -a colnames
  declare -a types
  for ((i=1;i<=cols;i++)); do
    read -p "Column $i name: " cname
    read -p "Column $i datatype (int/str): " ctype
    if [[ "$ctype" != "int" && "$ctype" != "str" ]]; then
      echo "Datatype must be int or str."
      return
    fi
    colnames+=("$cname")
    types+=("$ctype")
  done

  echo "Columns: ${colnames[*]}"
  echo "Types: ${types[*]}"
  read -p "Primary key column name: " pk
  pk_valid=0
  for cname in "${colnames[@]}"; do
    [ "$pk" = "$cname" ] && pk_valid=1
  done
  if ((pk_valid == 0)); then
    echo "PK must be among columns."
    return
  fi

  echo "${colnames[*]}" > "$tfile"
  {
    echo "COLUMNS:${colnames[*]}"
    echo "TYPES:${types[*]}"
    echo "PK:$pk"
  } > "$meta"
  echo "Table created."
}

list_tables() {
  local db="$1"
  echo "--- Tables in $db ---"
  for f in "$DB_ROOT/$db/"*; do
    [ -f "$f" ] && [[ "$f" != *.meta ]] && echo "$(basename "$f")"
  done
}

drop_table() {
  local db="$1"
  read -p "Enter Table Name to Drop: " tname
  tfile="$DB_ROOT/$db/$tname"
  meta="$tfile.meta"
  if [ -f "$tfile" ]; then
    rm -f "$tfile" "$meta"
    echo "Table dropped."
  else
    echo "Table not found."
  fi
}

read_metadata() {
  # returns 3 arrays: columns, types, pk
  local meta="$1"
  IFS=':' read -r _ cols_line < <(grep '^COLUMNS:' "$meta")
  IFS=':' read -r _ types_line < <(grep '^TYPES:' "$meta")
  IFS=':' read -r _ pk_line < <(grep '^PK:' "$meta")
  IFS=' ' read -r -a colnames <<<"$cols_line"
  IFS=' ' read -r -a types <<<"$types_line"
  pk="$pk_line"
}

insert_into_table() {
  local db="$1"
  read -p "Table: " tname
  tfile="$DB_ROOT/$db/$tname"
  meta="$tfile.meta"
  if [ ! -f "$tfile" ]; then
    echo "Table not found."
    return
  fi
  read_metadata "$meta"
  IFS=' ' read -r -a colnames <<<"${colnames[*]}"
  IFS=' ' read -r -a types <<<"${types[*]}"
  row=""
  pk_idx=-1
  for i in "${!colnames[@]}"; do
    [[ "${colnames[$i]}" = "$pk" ]] && pk_idx=$i
    while true; do
      read -p "Value for ${colnames[$i]} (${types[$i]}): " val
      if [[ "${types[$i]}" = "int" && ! "$val" =~ ^[0-9]+$ ]]; then
        echo "Invalid int."
      elif [[ "${types[$i]}" = "str" && -z "$val" ]]; then
        echo "Invalid str."
      else
        break
      fi
    done
    row+="$val "
  done

  pkval=$(echo "$row" | awk -v idx=$(($pk_idx+1)) '{print $idx}')
  if awk -v idx=$(($pk_idx+1)) -v pkval="$pkval" 'NR>1 {if ($idx==pkval) exit 1}' "$tfile"; then
    echo "$row" >> "$tfile"
    echo "Row inserted."
  else
    echo "PK already exists."
  fi
}

select_from_table() {
  local db="$1"
  read -p "Table: " tname
  tfile="$DB_ROOT/$db/$tname"
  if [ ! -f "$tfile" ]; then
    echo "Table not found."
    return
  fi
  echo "--- Content of $tname ---"
  column -t < "$tfile"
}

delete_from_table() {
  local db="$1"
  read -p "Table: " tname
  tfile="$DB_ROOT/$db/$tname"
  meta="$tfile.meta"
  if [ ! -f "$tfile" ]; then echo "Not found."; return; fi
  read_metadata "$meta"
  read -p "Delete by PK (${pk}): " pkval
  awk -v pkcol="$pk" 'NR==1{for(i=1;i<=NF;++i) if($i==pkcol) pkidx=i; print $0; next}
    {if($pkidx!=pkval) print $0}' pkval="$pkval" "$tfile" > "$tfile.tmp"
  mv "$tfile.tmp" "$tfile"
  echo "Deleted."
}

update_table() {
  local db="$1"
  read -p "Table: " tname
  tfile="$DB_ROOT/$db/$tname"
  meta="$tfile.meta"
  if [ ! -f "$tfile" ]; then echo "Not found."; return; fi
  read_metadata "$meta"
  read -p "PK ($pk) of row to update: " pkval
  read -p "Column to update: " ucol
  read -p "New value: " newval
  col_idx=-1
  type_new=""
  for i in "${!colnames[@]}"; do
    [[ "${colnames[$i]}" = "$ucol" ]] && col_idx=$i && type_new="${types[$i]}"
  done
  if ((col_idx == -1)); then echo "Column not found."; return; fi
  if [[ "$type_new" = "int" && ! "$newval" =~ ^[0-9]+$ ]]; then echo "Invalid int."; return; fi
  awk -v pkcol="$pk" -v pkval="$pkval" -v ucol="$ucol" -v newval="$newval" '
    NR==1{for(i=1;i<=NF;++i){if($i==pkcol) pkidx=i;if($i==ucol) uidx=i} print $0; next}
    {if($pkidx==pkval){$uidx=newval;} print $0}' "$tfile" > "$tfile.tmp"
  mv "$tfile.tmp" "$tfile"
  echo "Updated."
}

main_menu
