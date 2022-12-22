import { createClient } from 'redis';
// import { URL_REDIS } from '../config';

// const client = createClient({
//     url: URL_REDIS
// });

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

const getAndSetDataCache = async (key: string, value: any) => {
    await client.connect();

    if(value !== null)
        await client.set(key, JSON.stringify(value));
    const cache = await client.get(key);
    await client.disconnect();

    return cache
    
}

const deleteCache = async (key: string) => {
    await client.connect();
    await client.unlink(key)
    await client.disconnect();
}

export {
    getAndSetDataCache,  deleteCache
}