migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k2bjmkv7aysbdwu");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "k2bjmkv7aysbdwu",
    "created": "2023-04-03 12:59:02.538Z",
    "updated": "2023-04-03 13:00:36.980Z",
    "name": "category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ctrzd018",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
