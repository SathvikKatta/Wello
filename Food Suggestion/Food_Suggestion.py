import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, Flatten
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split

# Sample Food Dataset (Replace with real food & medication datasets)
data = {
    'food_id': [1, 2, 3, 4, 5],
    'food_name': ['Chicken', 'Tofu', 'Salmon', 'Broccoli', 'Rice'],
    'protein': [25, 10, 22, 3, 2],
    'carbs': [0, 5, 0, 7, 28],
    'fat': [3, 5, 13, 0.3, 0.5],
    'med_interaction': [0, 0, 1, 0, 0],  # 1 indicates an interaction
    'dietary_restrictions': ['non-veg', 'veg', 'non-veg', 'veg', 'veg']
}
df = pd.DataFrame(data)

# User Profile
user_profile = {
    'diet': 'veg',  # User preference (vegetarian, keto, etc.)
    'medications': ['medA'],  # Medications that interact with certain foods
    'protein_goal': 50,
    'carb_goal': 100,
    'fat_goal': 30
}

# Rule-Based Filtering
def filter_food(user, df):
    filtered = df[df['dietary_restrictions'] == user['diet']]
    filtered = filtered[filtered['med_interaction'] == 0]  # Remove risky foods
    return filtered

filtered_df = filter_food(user_profile, df)

# Deep Learning Model for Personalized Recommendations
X = df[['protein', 'carbs', 'fat']]
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

def build_model():
    model = Sequential([
        Dense(32, activation='relu', input_shape=(3,)),
        Dense(16, activation='relu'),
        Dense(1, activation='linear')  # Predict suitability score
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

model = build_model()
y = np.random.rand(len(X))  # Simulated suitability scores
model.fit(X_scaled, y, epochs=10, verbose=0)

# Predict suitability
filtered_scaled = scaler.transform(filtered_df[['protein', 'carbs', 'fat']])
filtered_df['suitability_score'] = model.predict(filtered_scaled)
recommended_foods = filtered_df.sort_values(by='suitability_score', ascending=False)

# Reinforcement Learning for Adaptation
ratings_dict = {'user_id': [1, 1, 1, 1, 1], 'food_id': [1, 2, 3, 4, 5], 'rating': [4, 5, 3, 5, 4]}
rating_df = pd.DataFrame(ratings_dict)
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(rating_df[['user_id', 'food_id', 'rating']], reader)
trainset, testset = train_test_split(data, test_size=0.2)
model_svd = SVD()
model_svd.fit(trainset)

# Predict new food ratings
recommended_foods['predicted_rating'] = recommended_foods['food_id'].apply(lambda x: model_svd.predict(1, x).est)
final_recommendations = recommended_foods.sort_values(by='predicted_rating', ascending=False)

print(final_recommendations[['food_name', 'predicted_rating']])