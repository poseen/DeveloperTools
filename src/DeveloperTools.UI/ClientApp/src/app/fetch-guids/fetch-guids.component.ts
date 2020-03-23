import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-guids',
  templateUrl: './fetch-guids.component.html',
  styleUrls: ['./fetch-guids.component.css']
})
export class FetchGuidsComponent {
  public guids: string[];
  public guidsSemicolonSeparated: string;

  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
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
    this.http.get<string[]>(this.baseUrl + 'guids').subscribe(result => {
      this.guids = result;
      this.guidsSemicolonSeparated = this.guids.join("\n");
      }, error => console.error(error));
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
}
