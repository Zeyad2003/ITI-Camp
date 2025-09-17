#!/bin/bash

# Bash Shell Script Database Management System
# A simple file-based DBMS implementation

# Color codes for better UI
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Global variables
DBMS_HOME="./DBMS_DATA"
CURRENT_DB=""
METADATA_FILE=".metadata"

# Helper: pause only in interactive mode
pause() {
    if [ -t 0 ] && [ -t 1 ]; then
        read -p "Press Enter to continue..."
    fi
}

# Create DBMS home directory if it doesn't exist
initialize_dbms() {
    if [ ! -d "$DBMS_HOME" ]; then
        mkdir -p "$DBMS_HOME"
        echo -e "${GREEN}DBMS initialized successfully!${NC}"
    fi
}

# Function to display header
display_header() {
    # Avoid clearing when not attached to a TTY (e.g., running under tests)
    if [ -t 1 ]; then
        clear
    fi
    echo -e "${CYAN}${BOLD}========================================${NC}"
    echo -e "${CYAN}${BOLD}    Bash Shell Script DBMS v1.0${NC}"
    echo -e "${CYAN}${BOLD}========================================${NC}"
    echo
}

# Function to validate name (alphanumeric and underscore only)
validate_name() {
    local name=$1
    if [[ ! "$name" =~ ^[a-zA-Z][a-zA-Z0-9_]*$ ]]; then
        echo -e "${RED}Error: Invalid name. Use only letters, numbers, and underscores. Must start with a letter.${NC}"
        return 1
    fi
    return 0
}

# Function to create database
create_database() {
    echo -e "${BLUE}Enter Database Name:${NC}"
    read -r db_name || return
    
    if ! validate_name "$db_name"; then
        return
    fi
    
    if [ -d "$DBMS_HOME/$db_name" ]; then
        echo -e "${RED}Error: Database '$db_name' already exists!${NC}"
    else
        mkdir -p "$DBMS_HOME/$db_name"
        echo -e "${GREEN}Database '$db_name' created successfully!${NC}"
    fi
    pause
}

# Function to list databases
list_databases() {
    echo -e "${BLUE}${BOLD}Available Databases:${NC}"
    echo -e "${YELLOW}--------------------${NC}"
    
    if [ -z "$(ls -A "$DBMS_HOME" 2>/dev/null)" ]; then
        echo -e "${YELLOW}No databases found.${NC}"
    else
        for db in "$DBMS_HOME"/*; do
            if [ -d "$db" ]; then
                basename "$db"
            fi
        done
    fi
    echo
    pause
}

# Function to drop database
drop_database() {
    echo -e "${BLUE}Enter Database Name to Drop:${NC}"
    read -r db_name || return
    
    if [ ! -d "$DBMS_HOME/$db_name" ]; then
        echo -e "${RED}Error: Database '$db_name' does not exist!${NC}"
    else
        echo -e "${YELLOW}Are you sure you want to drop database '$db_name'? (y/n):${NC}"
        read -r confirm || return
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            rm -rf "$DBMS_HOME/$db_name"
            echo -e "${GREEN}Database '$db_name' dropped successfully!${NC}"
        else
            echo -e "${YELLOW}Operation cancelled.${NC}"
        fi
    fi
    pause
}

# Function to create table
create_table() {
    echo -e "${BLUE}Enter Table Name:${NC}"
    read -r table_name || return
    
    if ! validate_name "$table_name"; then
        return
    fi
    
    if [ -f "$DBMS_HOME/$CURRENT_DB/$table_name" ]; then
        echo -e "${RED}Error: Table '$table_name' already exists!${NC}"
        pause
        return
    fi
    
    echo -e "${BLUE}Enter number of columns:${NC}"
    read -r num_cols || return
    
    if ! [[ "$num_cols" =~ ^[0-9]+$ ]] || [ "$num_cols" -lt 1 ]; then
        echo -e "${RED}Error: Invalid number of columns!${NC}"
        pause
        return
    fi
    
    metadata=""
    columns=""
    primary_key=""
    
    for ((i=1; i<=num_cols; i++)); do
        echo -e "${BLUE}Column $i:${NC}"
        echo -e "${CYAN}Enter column name:${NC}"
        read -r col_name || return
        
        if ! validate_name "$col_name"; then
            return
        fi
        
        echo -e "${CYAN}Select data type:${NC}"
        echo "1) Integer"
        echo "2) String"
        echo "3) Date (YYYY-MM-DD)"
        read -r data_type_choice || return
        
        case $data_type_choice in
            1) data_type="INT";;
            2) data_type="STRING";;
            3) data_type="DATE";;
            *) echo -e "${RED}Invalid choice. Defaulting to STRING.${NC}"; data_type="STRING";;
        esac
        
        # Always ask about primary key to match test input, but enforce only one PK
        echo -e "${CYAN}Is this column a primary key? (y/n):${NC}"
        read -r is_pk || return
        if [ "$is_pk" = "y" ] || [ "$is_pk" = "Y" ]; then
            if [ -z "$primary_key" ]; then
                primary_key="$col_name"
                metadata="${metadata}${col_name}:${data_type}:PK|"
            else
                echo -e "${YELLOW}Primary key already set to '$primary_key'. Ignoring additional PK selection.${NC}"
                metadata="${metadata}${col_name}:${data_type}|"
            fi
        else
            metadata="${metadata}${col_name}:${data_type}|"
        fi
        
        if [ $i -eq 1 ]; then
            columns="$col_name"
        else
            columns="${columns}:${col_name}"
        fi
    done
    
    # Trim trailing separator from metadata for reliable parsing
    metadata="${metadata%|}"
    
    # Create table file with metadata
    echo "METADATA|${metadata}" > "$DBMS_HOME/$CURRENT_DB/${table_name}"
    echo "COLUMNS|${columns}" >> "$DBMS_HOME/$CURRENT_DB/${table_name}"
    echo "PRIMARY_KEY|${primary_key}" >> "$DBMS_HOME/$CURRENT_DB/${table_name}"
    
    echo -e "${GREEN}Table '$table_name' created successfully!${NC}"
    pause
}

# Function to list tables
list_tables() {
    echo -e "${BLUE}${BOLD}Tables in database '$CURRENT_DB':${NC}"
    echo -e "${YELLOW}--------------------${NC}"
    
    local found=0
    for file in "$DBMS_HOME/$CURRENT_DB"/*; do
        if [ -f "$file" ]; then
            basename "$file"
            found=1
        fi
    done
    
    if [ $found -eq 0 ]; then
        echo -e "${YELLOW}No tables found.${NC}"
    fi
    
    echo
    pause
}

# Function to drop table
drop_table() {
    echo -e "${BLUE}Enter Table Name to Drop:${NC}"
    read -r table_name || return
    
    if [ ! -f "$DBMS_HOME/$CURRENT_DB/$table_name" ]; then
        echo -e "${RED}Error: Table '$table_name' does not exist!${NC}"
    else
        echo -e "${YELLOW}Are you sure you want to drop table '$table_name'? (y/n):${NC}"
        read -r confirm || return
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            rm -f "$DBMS_HOME/$CURRENT_DB/$table_name"
            echo -e "${GREEN}Table '$table_name' dropped successfully!${NC}"
        else
            echo -e "${YELLOW}Operation cancelled.${NC}"
        fi
    fi
    pause
}

# Function to validate data type
validate_data_type() {
    local value=$1
    local data_type=$2
    
    case $data_type in
        "INT")
            if ! [[ "$value" =~ ^-?[0-9]+$ ]]; then
                return 1
            fi
            ;;
        "DATE")
            if ! [[ "$value" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
                return 1
            fi
            ;;
        "STRING")
            # String accepts anything
            ;;
    esac
    return 0
}

# Function to check primary key uniqueness
check_primary_key() {
    local table=$1
    local pk_index=$2
    local pk_value=$3
    
    # Skip metadata lines and check for duplicate primary key
    while IFS= read -r line; do
        if [[ ! "$line" =~ ^(METADATA|COLUMNS|PRIMARY_KEY)\| ]]; then
            IFS=':' read -ra values <<< "$line"
            if [ "${values[$pk_index]}" = "$pk_value" ]; then
                return 1  # Duplicate found
            fi
        fi
    done < "$DBMS_HOME/$CURRENT_DB/$table"
    
    return 0  # No duplicate
}

# Function to insert into table
insert_into_table() {
    echo -e "${BLUE}Enter Table Name:${NC}"
    read -r table_name || return
    
    if [ ! -f "$DBMS_HOME/$CURRENT_DB/$table_name" ]; then
        echo -e "${RED}Error: Table '$table_name' does not exist!${NC}"
        pause
        return
    fi
    
    # Read metadata
    local metadata=$(grep "^METADATA|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    local columns=$(grep "^COLUMNS|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    local primary_key=$(grep "^PRIMARY_KEY|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    
    IFS='|' read -ra meta_array <<< "$metadata"
    IFS=':' read -ra col_array <<< "$columns"
    
    local values=""
    local pk_index=-1
    local pk_value=""
    
    for i in "${!col_array[@]}"; do
        local col_info="${meta_array[$i]}"
        IFS=':' read -ra info <<< "$col_info"
        local col_name="${info[0]}"
        local data_type="${info[1]}"
        
        echo -e "${CYAN}Enter value for $col_name ($data_type):${NC}"
        read -r value || return
        
        # Validate data type
        if ! validate_data_type "$value" "$data_type"; then
            echo -e "${RED}Error: Invalid $data_type value!${NC}"
            pause
            return
        fi
        
        # Check if this is the primary key
        if [ "$col_name" = "$primary_key" ]; then
            pk_index=$i
            pk_value="$value"
        fi
        
        if [ -z "$values" ]; then
            values="$value"
        else
            values="${values}:${value}"
        fi
    done
    
    # Check primary key uniqueness if exists
    if [ ! -z "$primary_key" ] && [ $pk_index -ne -1 ]; then
        if ! check_primary_key "$table_name" "$pk_index" "$pk_value"; then
            echo -e "${RED}Error: Primary key value '$pk_value' already exists!${NC}"
            pause
            return
        fi
    fi
    
    # Insert the record
    echo "$values" >> "$DBMS_HOME/$CURRENT_DB/$table_name"
    echo -e "${GREEN}Record inserted successfully!${NC}"
    pause
}

# Function to select from table
select_from_table() {
    echo -e "${BLUE}Enter Table Name:${NC}"
    read -r table_name || return
    
    if [ ! -f "$DBMS_HOME/$CURRENT_DB/$table_name" ]; then
        echo -e "${RED}Error: Table '$table_name' does not exist!${NC}"
        pause
        return
    fi
    
    # Read columns
    local columns=$(grep "^COLUMNS|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    IFS=':' read -ra col_array <<< "$columns"
    
    echo -e "\n${CYAN}${BOLD}Table: $table_name${NC}"
    echo -e "${YELLOW}========================================${NC}"
    
    # Print header
    printf "${BOLD}"
    for col in "${col_array[@]}"; do
        printf "%-15s | " "$col"
    done
    printf "${NC}\n"
    
    # Print separator
    for col in "${col_array[@]}"; do
        printf "%-15s | " "---------------"
    done
    echo
    
    # Print data
    local row_count=0
    while IFS= read -r line; do
        if [[ ! "$line" =~ ^(METADATA|COLUMNS|PRIMARY_KEY)\| ]]; then
            if [ ! -z "$line" ]; then  # Skip empty lines
                IFS=':' read -ra values <<< "$line"
                for value in "${values[@]}"; do
                    printf "%-15s | " "$value"
                done
                echo
                ((row_count++))
            fi
        fi
    done < "$DBMS_HOME/$CURRENT_DB/$table_name"
    
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${GREEN}Total rows: $row_count${NC}\n"
    pause
}

# Function to delete from table
delete_from_table() {
    echo -e "${BLUE}Enter Table Name:${NC}"
    read -r table_name || return
    
    if [ ! -f "$DBMS_HOME/$CURRENT_DB/$table_name" ]; then
        echo -e "${RED}Error: Table '$table_name' does not exist!${NC}"
        pause
        return
    fi
    
    # Read columns
    local columns=$(grep "^COLUMNS|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    IFS=':' read -ra col_array <<< "$columns"
    
    echo -e "${CYAN}Select column to filter by:${NC}"
    for i in "${!col_array[@]}"; do
        echo "$((i+1))) ${col_array[$i]}"
    done
    
    read -r col_choice || return
    if ! [[ "$col_choice" =~ ^[0-9]+$ ]] || [ "$col_choice" -lt 1 ] || [ "$col_choice" -gt "${#col_array[@]}" ]; then
        echo -e "${RED}Invalid choice!${NC}"
        pause
        return
    fi
    
    local col_index=$((col_choice-1))
    echo -e "${CYAN}Enter value to match for deletion:${NC}"
    read -r match_value || return
    
    # Create temporary file
    local temp_file=$(mktemp)
    
    # Copy metadata lines
    grep "^METADATA|" "$DBMS_HOME/$CURRENT_DB/$table_name" > "$temp_file"
    grep "^COLUMNS|" "$DBMS_HOME/$CURRENT_DB/$table_name" >> "$temp_file"
    grep "^PRIMARY_KEY|" "$DBMS_HOME/$CURRENT_DB/$table_name" >> "$temp_file"
    
    local deleted_count=0
    
    # Process data lines
    while IFS= read -r line; do
        if [[ ! "$line" =~ ^(METADATA|COLUMNS|PRIMARY_KEY)\| ]]; then
            IFS=':' read -ra values <<< "$line"
            if [ "${values[$col_index]}" != "$match_value" ]; then
                echo "$line" >> "$temp_file"
            else
                ((deleted_count++))
            fi
        fi
    done < "$DBMS_HOME/$CURRENT_DB/$table_name"
    
    # Replace original file
    mv "$temp_file" "$DBMS_HOME/$CURRENT_DB/$table_name"
    
    echo -e "${GREEN}Deleted $deleted_count record(s) successfully!${NC}"
    pause
}

# Function to update table
update_table() {
    echo -e "${BLUE}Enter Table Name:${NC}"
    read -r table_name || return
    
    if [ ! -f "$DBMS_HOME/$CURRENT_DB/$table_name" ]; then
        echo -e "${RED}Error: Table '$table_name' does not exist!${NC}"
        pause
        return
    fi
    
    # Read metadata and columns
    local metadata=$(grep "^METADATA|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    local columns=$(grep "^COLUMNS|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    local primary_key=$(grep "^PRIMARY_KEY|" "$DBMS_HOME/$CURRENT_DB/$table_name" | cut -d'|' -f2)
    
    IFS='|' read -ra meta_array <<< "$metadata"
    IFS=':' read -ra col_array <<< "$columns"
    
    echo -e "${CYAN}Select column to filter by:${NC}"
    for i in "${!col_array[@]}"; do
        echo "$((i+1))) ${col_array[$i]}"
    done
    
    read -r filter_col_choice || return
    if ! [[ "$filter_col_choice" =~ ^[0-9]+$ ]] || [ "$filter_col_choice" -lt 1 ] || [ "$filter_col_choice" -gt "${#col_array[@]}" ]; then
        echo -e "${RED}Invalid choice!${NC}"
        pause
        return
    fi
    
    local filter_col_index=$((filter_col_choice-1))
    echo -e "${CYAN}Enter value to match:${NC}"
    read -r match_value || return
    
    echo -e "${CYAN}Select column to update:${NC}"
    for i in "${!col_array[@]}"; do
        echo "$((i+1))) ${col_array[$i]}"
    done
    
    read -r update_col_choice || return
    if ! [[ "$update_col_choice" =~ ^[0-9]+$ ]] || [ "$update_col_choice" -lt 1 ] || [ "$update_col_choice" -gt "${#col_array[@]}" ]; then
        echo -e "${RED}Invalid choice!${NC}"
        pause
        return
    fi
    
    local update_col_index=$((update_col_choice-1))
    
    # Get data type for validation
    local col_info="${meta_array[$update_col_index]}"
    IFS=':' read -ra info <<< "$col_info"
    local data_type="${info[1]}"
    
    echo -e "${CYAN}Enter new value ($data_type):${NC}"
    read -r new_value || return
    
    # Validate data type
    if ! validate_data_type "$new_value" "$data_type"; then
        echo -e "${RED}Error: Invalid $data_type value!${NC}"
        pause
        return
    fi
    
    # Check if updating primary key
    if [ "${col_array[$update_col_index]}" = "$primary_key" ]; then
        # Find primary key index
        local pk_index=-1
        for i in "${!col_array[@]}"; do
            if [ "${col_array[$i]}" = "$primary_key" ]; then
                pk_index=$i
                break
            fi
        done
        
        if ! check_primary_key "$table_name" "$pk_index" "$new_value"; then
            echo -e "${RED}Error: Primary key value '$new_value' already exists!${NC}"
            pause
            return
        fi
    fi
    
    # Create temporary file
    local temp_file=$(mktemp)
    
    # Copy metadata lines
    grep "^METADATA|" "$DBMS_HOME/$CURRENT_DB/$table_name" > "$temp_file"
    grep "^COLUMNS|" "$DBMS_HOME/$CURRENT_DB/$table_name" >> "$temp_file"
    grep "^PRIMARY_KEY|" "$DBMS_HOME/$CURRENT_DB/$table_name" >> "$temp_file"
    
    local updated_count=0
    
    # Process data lines
    while IFS= read -r line; do
        if [[ ! "$line" =~ ^(METADATA|COLUMNS|PRIMARY_KEY)\| ]]; then
            IFS=':' read -ra values <<< "$line"
            if [ "${values[$filter_col_index]}" = "$match_value" ]; then
                values[$update_col_index]="$new_value"
                ((updated_count++))
            fi
            
            # Reconstruct line
            local new_line=""
            for i in "${!values[@]}"; do
                if [ $i -eq 0 ]; then
                    new_line="${values[$i]}"
                else
                    new_line="${new_line}:${values[$i]}"
                fi
            done
            echo "$new_line" >> "$temp_file"
        fi
    done < "$DBMS_HOME/$CURRENT_DB/$table_name"
    
    # Replace original file
    mv "$temp_file" "$DBMS_HOME/$CURRENT_DB/$table_name"
    
    echo -e "${GREEN}Updated $updated_count record(s) successfully!${NC}"
    pause
}

# Database menu
database_menu() {
    while true; do
        display_header
        echo -e "${GREEN}${BOLD}Connected to Database: $CURRENT_DB${NC}"
        echo
        echo -e "${BLUE}${BOLD}Database Menu:${NC}"
        echo "1) Create Table"
        echo "2) List Tables"
        echo "3) Drop Table"
        echo "4) Insert into Table"
        echo "5) Select From Table"
        echo "6) Delete From Table"
        echo "7) Update Table"
        echo "8) Back to Main Menu"
        echo
        echo -e "${CYAN}Enter your choice:${NC}"
        read -r choice || return
        
        case $choice in
            1) create_table ;;
            2) list_tables ;;
            3) drop_table ;;
            4) insert_into_table ;;
            5) select_from_table ;;
            6) delete_from_table ;;
            7) update_table ;;
            8) CURRENT_DB=""; return ;;
            *) echo -e "${RED}Invalid choice!${NC}"; pause ;;
        esac
    done
}

# Function to connect to database
connect_to_database() {
    echo -e "${BLUE}Enter Database Name to Connect:${NC}"
    read -r db_name || return
    
    if [ ! -d "$DBMS_HOME/$db_name" ]; then
        echo -e "${RED}Error: Database '$db_name' does not exist!${NC}"
        pause
    else
        CURRENT_DB="$db_name"
        echo -e "${GREEN}Connected to database '$db_name'${NC}"
        sleep 1
        database_menu
    fi
}

# Main menu
main_menu() {
    while true; do
        display_header
        echo -e "${BLUE}${BOLD}Main Menu:${NC}"
        echo "1) Create Database"
        echo "2) List Databases"
        echo "3) Connect To Database"
        echo "4) Drop Database"
        echo "5) Exit"
        echo
        echo -e "${CYAN}Enter your choice:${NC}"
        read -r choice || exit 0
        
        case $choice in
            1) create_database ;;
            2) list_databases ;;
            3) connect_to_database ;;
            4) drop_database ;;
            5) echo -e "${GREEN}Thank you for using Bash DBMS!${NC}"; exit 0 ;;
            *) echo -e "${RED}Invalid choice!${NC}"; pause ;;
        esac
    done
}

# Main execution
initialize_dbms
main_menu