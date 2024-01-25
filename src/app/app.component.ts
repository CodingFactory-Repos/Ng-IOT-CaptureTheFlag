import { Component } from "@angular/core";
import mqtt from 'mqtt';
import { client } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  players: { name: string | undefined, score: number}[] = [];

  ngOnInit() {
    this.askNumberOfUsers();
  }

  askNumberOfUsers() {
    client.publish('IOT/CTF/numberOfPlayers', 'get');

    client.on('message', (topic, message) => {
      console.log(topic, Number(message.toString()));
      if (topic === 'IOT/CTF/numberOfPlayers' && message.toString() !== 'get') {
        this.players = [];
        for (let i = 0; i < Number(message.toString()); i++) {
          this.players.push({name: undefined, score: 0});
        }
      }

      console.log(this.players)
    });
  }

  turnOnLight() {
    client.publish('IOT/CTF/turnOnLight', 'true');
  }
}
