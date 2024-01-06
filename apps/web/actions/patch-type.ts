"use server";

import { httpClient } from "@app/lib/axios";

export type PatchTypeT = {
  id: string;
  image: string;
};

export async function getPatchTypes(): Promise<PatchTypeT[]> {
  return (await httpClient.get<PatchTypeT[]>("v1/patch-type")).data.map(
    ({ image, ...patchType }) => ({
      ...patchType,
      image: httpClient.defaults.baseURL + image,
    })
  );
}
