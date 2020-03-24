import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-guids',
  templateUrl: './fetch-guids.component.html',
  styleUrls: ['./fetch-guids.component.css']
})

export class FetchGuidsComponent {
  public numberOfGuidsToGenerate: number;
  public guids: string[];
  public guidsSemicolonSeparated: string;

  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.numberOfGuidsToGenerate = 100;
    this.http = http;
    this.regenerate();
  }

  public copyClicked(currentTarget: EventTarget) {
    var button = currentTarget as HTMLButtonElement;
    if (button === null) {
      var message = "Couldn't get button.";
      console.error(message);
      alert(message);
    }

    this.copyTextToClipboard(button.innerText);
  }

  public copyAll() {
    var element = document.getElementById("massGuids");
    var selBox = element as HTMLTextAreaElement;
    this.copyTextToClipboard(selBox.innerText);
  }

  public regenerate() {
    this.guids = [];
    this.guids = this.generateGuids(this.numberOfGuidsToGenerate);
    this.guidsSemicolonSeparated = this.guids.join("\n");
  }

  private copyTextToClipboard(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /*
  * generate an array of GUIDs
  * @example generateGuids(0) : []
  * @example generateGuids(1) : ['02c86b69-0a91-42d7-bf5c-62e4135f77a2']
  * @example generateGuids(2) : ['84d79a74-2138-4deb-9419-da4808052686', 'cd28ec2f-296e-4e6d-8815-555868c59859']
  * Based on https://stackoverflow.com/questions/52836247/how-to-generate-uuid-in-angular-6
  */
  private generateGuids(pCount : number) : Array<string> {

    let resultArr: Array<string> = [];

    while (pCount > 0) {
      let guid = this.generateGuid();
      if (resultArr.indexOf(guid) == -1) {
        resultArr.push(guid);
        pCount--;
      }
    }
    
    return resultArr;
  }

  /*
  * generate a GUID
  * @example generateGuid() : d715f3b8-435f-48fd-ae42-d5da7d238a96
  * Based on https://stackoverflow.com/questions/52836247/how-to-generate-uuid-in-angular-6
  */
  private generateGuid(): string {
    const isString = `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;
    return isString;
  }

  /*
  * generate a groups of 4 random characters
  * @example S4() : e4f1
  * Based on https://stackoverflow.com/questions/52836247/how-to-generate-uuid-in-angular-6
  */
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
