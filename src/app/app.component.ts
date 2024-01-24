import { Component } from "@angular/core";
import mqtt from 'mqtt';
import { client } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ngOnInit() {
    client.on('message', (topic, message) => {
      console.log('received message: ', message.toString());
    });
  }

  turnOnLight() {
    client.publish('IOT/CTF/turnOnLight', 'true');
  }

  turnOffLight() {
    client.publish('IOT/CTF/turnOnLight', 'false');
  }
}
