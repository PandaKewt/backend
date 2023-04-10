#!/bin/python

import numpy as np
import joblib
import sys

data = [
    "(vertigo) Paroymsal Positional Vertigo",
    "AIDS",
    "Acne",
    "Alcoholic hepatitis",
    "Allergy",
    "Arthritis",
    "Bronchial Asthma",
    "Cervical spondylosis",
    "Chicken pox",
    "Chronic cholestasis",
    "Common Cold",
    "Dengue",
    "Diabetes",
    "Dimorphic hemmorhoids(piles)",
    "Drug Reaction",
    "Fungal infection",
    "GERD",
    "Gastroenteritis",
    "Heart attack",
    "Hepatitis B",
    "Hepatitis C",
    "Hepatitis D",
    "Hepatitis E",
    "Hypertension ",
    "Hyperthyroidism",
    "Hypoglycemia",
    "Hypothyroidism",
    "Impetigo",
    "Jaundice",
    "Malaria",
    "Migraine",
    "Osteoarthristis",
    "Paralysis (brain hemorrhage)",
    "Peptic ulcer diseae",
    "Pneumonia",
    "Psoriasis",
    "Tuberculosis",
    "Typhoid",
    "Urinary tract infection",
    "Varicose veins",
    "hepatitis A",
]


def init():
    global model
    model_path = sys.path[0] + "/diease_model.pkl"
    model = joblib.load(model_path)


def run():
    list = sys.argv[1]
    data = np.array(list.split(",")).reshape(1, -1)
    y_hat = model.predict(data)
    return y_hat.tolist()


init()
ans = run()[0]
print(data[ans.index(max(ans))])
