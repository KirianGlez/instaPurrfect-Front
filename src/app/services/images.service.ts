import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  connectionString = "DefaultEndpointsProtocol=https;AccountName=instapurrfectstorage;AccountKey=bam1b6OrVdK+ZztnvTTDdZOGnM4xmpRMITsIFPUkD1B1hactGP14wI989ov1Fr7IA0dOue23lcX7+AStI1J1jA==;EndpointSuffix=core.windows.net"

  blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);

  async uploadImageToBlobStorage(file: File, filename: string): Promise<string> {

    const containerName = "pictures";

    const containerClient = this.blobServiceClient.getContainerClient(containerName);

    const blobClient = containerClient.getBlockBlobClient(filename);

    await blobClient.uploadData(file, { blobHTTPHeaders: {blobContentType: file.type}});

    return blobClient.url;
  }

}
