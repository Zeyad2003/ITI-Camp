"""
    bool:

    type casts:
        bool()

        Only one Object that lives in memory
        True.
        False.
        None.


    truthy values:
                True, any number other than 0, "1", [1], (1), {"key": "Value"}, {1}

    Falsy values:
                False, 0, "", [], (), {}, {}, None


    if

    elif

    elif

    elif

    else

    and
    or

    no &&
    no ||

    short-circuiting:
        or: acts as if the first Truthy value is enough
        and: acts as if the first Falsy value is enough

    tips:
        1 - If you can use the actual value, use it instead of casting to bool and then comparing with True and False
        2 - use Is instead of == for comparison with True or False

"""

if True:
    print("True")

if 1:
        print("True")

if 0:
    print("false")

if " ":
    print("True")

if False and 1:
    print("false")

if 1 or False:
    print("true")
    
print(bool(" "))

x = True

