import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-guids',
  templateUrl: './fetch-guids.component.html'
})
export class FetchGuidsComponent {
  public guids: string[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<string[]>(baseUrl + 'guids').subscribe(result => {
      this.guids = result;
    }, error => console.error(error));
  }

  public copyClicked($event: Event) {
    var button = $event.currentTarget as HTMLButtonElement;
    if (button === null) {
      var message = "Couldn't get button.";
      console.error(message);
      alert(message);
    }

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = button.innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
