import { CosmosClient } from '@azure/cosmos';

const endpoint = 'YOUR_COSMOS_DB_ENDPOINT';
const key = 'YOUR_COSMOS_DB_KEY';
const databaseId = 'YOUR_DATABASE_ID';
const containerId = 'YOUR_CONTAINER_ID';

const client = new CosmosClient({ endpoint, key });

export const addExpense = async (expense) => {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  const { resource } = await container.items.create(expense);
  return resource;
};

export const getExpenses = async () => {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  const { resources } = await container.items.readAll().fetchAll();
  return resources;
};
