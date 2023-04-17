import { Injectable } from '@angular/core';
import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  accountName = "instapurrfectstorage";
  containerName = "pictures";

  private containerClient(sas?: string): ContainerClient {
    let token = "sp=racwdl&st=2023-04-17T11:33:24Z&se=2023-04-19T19:33:24Z&spr=https&sv=2021-12-02&sr=c&sig=8BoBFyF0WmaDXEsHNjayU5N2ZXGttYMy7xvjP9KGEJY%3D"
    if (sas) {
      token = sas;
    }

    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${token}`)
    .getContainerClient(this.containerName);
  }

  public deleteImage(sas: string, name: string, handler: () => void) {
    this.containerClient(sas).deleteBlob(name).then(() => {
      handler()
    })
  }

  public uploadImage(sas: string, content: Blob, name: string, handler: () => void) {
    const blockBlobClient = this.containerClient(sas).getBlockBlobClient(name);
    blockBlobClient
    .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type}})
    .then(() => handler())
  }

}
