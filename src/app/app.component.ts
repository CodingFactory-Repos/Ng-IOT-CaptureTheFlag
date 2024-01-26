import { Component } from "@angular/core";
import mqtt from 'mqtt';
import { client } from './app.module';

interface Player {
  id: string | undefined;
  name: string | undefined;
  team: string;
  score: number | null | undefined;
}

interface Team {
  name: string;
  players: Player[];
  totalPoints: number;
}

interface Flag   {
  id: string;
  team:string;
  name: string;
  status:string | null | undefined;
  player:string | null | undefined;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
players: { id: string, name?: string, score: number, status: "DEAD" | "ALIVE" | "HAVEFLAG", team?: "RED" | "BLUE" }[] = [];

  ngOnInit() {
    this.askNumberOfUsers();
  }

  askNumberOfUsers() {
    client.publish('IOT/CTF/players', 'get');

    client.on('message', (topic, message) => {
      console.log(topic, message.toString());
      if (topic === 'IOT/CTF/numberOfPlayers' && message.toString() !== 'get') {
        const allPlayersIds = JSON.parse(message.toString());
        this.players = [];
        for (let i = 0; i < allPlayersIds.length; i++) {
          this.players.push({id: allPlayersIds[i], score: 0, status: "ALIVE"});
        }

        console.log(this.players);
      }
    });
  }

  turnOnLight() {
    client.publish('IOT/CTF/turnOnLight', 'true');
  }
}
