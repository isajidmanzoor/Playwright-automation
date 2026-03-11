import random
from datetime import datetime

# Luhn algorithm check digit generator
def generate_card_number(prefix="4", length=16):
    number = prefix
    while len(number) < length - 1:
        number += str(random.randint(0,9))

    digits = [int(d) for d in number]
    total = 0
    reverse = digits[::-1]

    for i, d in enumerate(reverse):
        if i % 2 == 0:
            d = d * 2
            if d > 9:
                d -= 9
        total += d

    check_digit = (10 - (total % 10)) % 10
    return number + str(check_digit)

# Expiry date generator
def generate_expiry():
    month = random.randint(1,12)
    year = random.randint(datetime.now().year + 1, datetime.now().year + 5)
    return f"{month:02d}/{str(year)[-2:]}"

# CVC generator
def generate_cvc():
    return str(random.randint(100,999))

# Generate full test card
def generate_test_card():
    card = generate_card_number()
    expiry = generate_expiry()
    cvc = generate_cvc()

    return {
        "Card Number": card,
        "Expiry Date": expiry,
        "CVC": cvc
    }

print(generate_test_card())
