# API Documentation

Base URL: `/api`

## Authentication
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Create a new account | No |
| `/auth/login` | `POST` | Login and receive JWT token | No |

## User Profile
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/users/me` | `GET` | Get current user details | Yes |
| `/users/profile` | `PUT` | Update username and email | Yes |

## Recipes
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/recipes` | `GET` | Fetch all recipes | No |
| `/recipes` | `POST` | Create a new recipe | Yes |
| `/recipes/:id` | `GET` | Get specific recipe details | No |
| `/recipes/:id` | `PUT` | Update an existing recipe | Yes |
| `/recipes/:id` | `DELETE` | Remove a recipe | Yes |

## Request Examples

### Create Recipe (POST `/api/recipes`)
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "title": "Easy Pancakes",
  "category": "Breakfast",
  "ingredients": ["Flour", "Milk", "Eggs"],
  "instructions": "1. Mix ingredients.\n2. Cook on pan.",
  "time": 20
}