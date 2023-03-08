
# API Documentation

- Base URL  : ```https://contact-list-backend-production.up.railway.app/api/contacts```

## Get All Contacts

**URL** : `/contacts`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

**Data Params** : None

**Success Response**

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "5f3f9f9f9f9f9f9f9f9f9f9f",
      "name": "John Doe",
      "contact_number": "1234567890"
    },
    {
      "_id": "5f3f9f9f9f9f9f9f9f9f9f9f",
      "name": "Jane Doe",
      "contact_number": "0987654321"
    }
  ]
}
```

## Create Contact

**URL** : `/contacts`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : None

**Data Params**

```json
{
  "name": "John Doe",
  "contact_number": "1234567890"
}
```

**Success Response**

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "contact created successfully",
  "data": {
    "_id": "5f3f9f9f9f9f9f9f9f9f9f9f",
    "name": "John Doe",
    "contact_number": "1234567890"
  }
}
```

## Delete Contact

**URL** : `/contacts/:id`

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : None

**Data Params** : None

**Success Response**

**Code** : `204 No Content`

**Content example**

```json
{
  "status": "success",
  "message": "contact deleted successfully"
}
```

## Update Contact

**URL** : `/contacts/:id`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

**Data Params**

```json
{
  "name": "John Doe",
  "contact_number": "1234567890"
}
```

**Success Response**

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "message": "contact updated successfully",
  "data": {
    "_id": "5f3f9f9f9f9f9f9f9f9f9f9f",
    "name": "John Doe",
    "contact_number": "1234567890"
  }
}
```
