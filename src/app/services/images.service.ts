import { Injectable } from '@angular/core';
import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';
import { ComputerVisionClient, ComputerVisionModels } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { Observable, from, map, switchMap, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  
  private apiKey = '58ac6e2c12ed4ef0bdc5c05f62544eba';
  private endPoint = 'https://instapurrfectvision.cognitiveservices.azure.com/';

  private accountName = "instapurrfectstorage";
  private containerName = "pictures";
  url = "https://instapurrfectstorage.blob.core.windows.net/pictures/";
  private sas = "sp=racwdl&st=2023-04-17T11:33:24Z&se=2023-04-19T19:33:24Z&spr=https&sv=2021-12-02&sr=c&sig=8BoBFyF0WmaDXEsHNjayU5N2ZXGttYMy7xvjP9KGEJY%3D";

  private containerClient(sas?: string): ContainerClient {
    let token = "sp=racwdl&st=2023-04-17T11:33:24Z&se=2023-04-19T19:33:24Z&spr=https&sv=2021-12-02&sr=c&sig=8BoBFyF0WmaDXEsHNjayU5N2ZXGttYMy7xvjP9KGEJY%3D"
    if (sas) {
      token = sas;
    }

    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${token}`)
    .getContainerClient(this.containerName);
  }

  public deleteImage( name: string, handler: () => void) {
    this.containerClient(this.sas).deleteBlob(name).then(() => {
      handler()
    })
  }

  //Revisa si la imagen es explícita y si contiene gatos y la sube al blob
  public uploadImage(imageContent: Blob, imageName: string): Observable<string> {
    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': this.apiKey } }),
      this.endPoint
    );
  
    // Subscribirse al evento "onload" de la imagen para obtener su contenido en forma de array de bytes (Uint8Array).
    return new Observable<string>((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBytes = new Uint8Array(<ArrayBuffer>reader.result);
        const params = {
          visualFeatures: ['Adult', 'Description'],
          details: ['Adult']
        };
        computerVisionClient.analyzeImageInStream(imageBytes, {visualFeatures: ['Adult', 'Description']}).then((result) => {
          const tags = result.description?.tags;
          if (result.adult?.isAdultContent || result.adult?.isRacyContent || result.adult?.isGoryContent) {
            // Si la imagen es explícita, rechazar la promesa con un error.
            observer.error('La imagen contiene contenido explícito.');
          } else if(tags?.find(tag => tag.toLowerCase() === 'cat')) {
            const blockBlobClient = this.containerClient(this.sas).getBlockBlobClient(imageName);
            blockBlobClient.uploadData(imageContent, { blobHTTPHeaders: { blobContentType: imageContent.type } }).then(() => {
              observer.next(blockBlobClient.url);
              observer.complete();
            });
          }else {
            observer.error('La imagen no contiene un gato');
          }
        }).catch((error) => {
          observer.error(`Error al analizar la imagen: ${error}`);
        });
      };
      reader.readAsArrayBuffer(imageContent);
    });
  }

}
