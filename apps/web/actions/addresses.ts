'use server'

import { httpClient } from "@app/lib/axios";

export async function getAllAddresses(): Promise<AddressT[]> {
  return (await httpClient.get('v1/addresses/all')).data
}

export async function getAddress(id: string): Promise<AddressT> {
  return (await httpClient.get(`v1/addresses/${id}`)).data
}

export async function createAddress(payload: object): Promise<true | string> {
  try {
    const { status } = await httpClient.post('v1/addresses', payload);
    if (status !== 201)
      throw new Error('Faild to create the address')
    return true;
  } catch (e: any) {
    return (typeof e?.response?.data?.message === "string" ? e?.response?.data?.message : e?.response?.data?.message[0]) || e.message
  }
}

export async function updateAddress(payload: object, id: string): Promise<true | string> {
  try {
    const { status } = await httpClient.patch(`v1/addresses/${id}`, payload);
    if (status !== 200)
      throw new Error('Faild to update the address')
    return true;
  } catch (e: any) {
    return (typeof e?.response?.data?.message === "string" ? e?.response?.data?.message : e?.response?.data?.message[0]) || e.message
  }
}

export async function deleteAddress(id: string): Promise<true | string> {
  try {
    const { status } = await httpClient.delete(`v1/addresses/${id}`);
    if (status !== 200)
      throw new Error('Faild to delete the address')
    return true;
  } catch (e: any) {
    return (typeof e?.response?.data?.message === "string" ? e?.response?.data?.message : e?.response?.data?.message[0]) || e.message
  }
}

export type AddressT = {
  id: string;
  receiverName: string,
  receiverPhone: string,
  country: string,
  province: string,
  city: string,
  zipCode: string,
  location: string
};
