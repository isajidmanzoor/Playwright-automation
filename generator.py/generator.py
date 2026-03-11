# generator.py
# Generates valid & invalid cards, expiry dates, and CVC
# Saves data to CSV 

import random
import csv
from datetime import datetime


# Luhn Algorithm: Check Digit

def luhn_check_digit(number):
    digits = [int(d) for d in number]
    total = 0
    reverse = digits[::-1]

    for i, d in enumerate(reverse):
        if i % 2 == 0:
            d *= 2
            if d > 9:
                d -= 9
        total += d

    return (10 - (total % 10)) % 10


# Generate a valid Visa-style card

def generate_valid_card():
    prefix = "4"  # Visa prefix
    issuer = prefix + "".join(str(random.randint(0, 9)) for _ in range(5))
    account = "".join(str(random.randint(0, 9)) for _ in range(9))
    partial = issuer + account
    check = luhn_check_digit(partial)
    return partial + str(check)


# Generate an invalid card (negative testing)

def generate_invalid_card():
    card = generate_valid_card()
    wrong_digit = (int(card[-1]) + random.randint(1, 9)) % 10
    return card[:-1] + str(wrong_digit)


# Expiry date generator

def generate_expiry():
    month = random.randint(1, 12)
    year = random.randint(datetime.now().year + 1, datetime.now().year + 5)
    return f"{month:02d}/{str(year)[-2:]}"


# CVC generator

def generate_cvc():
    return str(random.randint(100, 999))


# Generate multiple test cards

def generate_cards(count=50):
    data = []

    for _ in range(count):
        valid_card = generate_valid_card()
        invalid_card = generate_invalid_card()

        data.append([
            "VALID",
            valid_card,
            generate_expiry(),
            generate_cvc()
        ])

        data.append([
            "INVALID",
            invalid_card,
            generate_expiry(),
            generate_cvc()
        ])

    return data


# Save generated cards to CSV

def save_to_csv(data, filename="qa_test_cards.csv"):
    with open(filename, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["TYPE", "CARD_NUMBER", "EXPIRY", "CVC"])
        writer.writerows(data)
    print(f"✅ QA Test data generated and saved to {filename}")
    print(f"Total records: {len(data)}")


# Main execution

if __name__ == "__main__":
    cards = generate_cards(count=50)  # Change count as needed
    save_to_csv(cards)