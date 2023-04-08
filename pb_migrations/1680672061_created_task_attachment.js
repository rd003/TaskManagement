migrate((db) => {
  const collection = new Collection({
    "id": "au9wkns0etbgxst",
    "created": "2023-04-05 05:21:01.776Z",
    "updated": "2023-04-05 05:21:01.776Z",
    "name": "task_attachment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gtd0yttg",
        "name": "task_id",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "eiytar78",
        "name": "attachment",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("au9wkns0etbgxst");

  return dao.deleteCollection(collection);
})
