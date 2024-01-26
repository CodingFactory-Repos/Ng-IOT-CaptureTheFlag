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
  teams: Team[] = [];
  players: Player[] = []; 

  ngOnInit() {
    this.teams = [
      {
        name: 'Rouge',
        players: [
          { id: "Banana", team:"Rouge", name: 'Joueur1', score: 10 },
          { id: "Banana1", team:"Rouge", name: 'Joueur2', score: 5 },
          ],
        totalPoints: 15,
      },
      {
        name: 'Bleu',
        players: [
          { id: "Banana2", team:"bleu", name: 'JoueurA', score: 8 },
          {id: "Banana3", team:"bleu", name: 'JoueurB', score: 12 },
        ],
        totalPoints: 20,
      },
    ];
    this.askNumberOfUsers();
  }

  askNumberOfUsers() {
    client.publish('IOT/CTF/players', 'get');

    client.on('message', (topic, message) => {
      console.log(topic, Number(message.toString()));
      if (topic === 'IOT/CTF/players' && message.toString() !== 'get') {
        console.log("Coucou t'as maman", JSON.parse(message.toString()));
        
        // this.teams = [
        //   { name: 'Rouge', players: [], totalPoints: 0 },
        //   { name: 'Bleu', players: [], totalPoints: 0 },
        // ];

        // for (let i = 0; i < Number(message.toString()); i++) {
        //   this.teams[0].players.push({
        //     name: undefined, score: 0,
        //     id: undefined,
        //     team: ""
        //   }); // Rouge
        //   this.teams[1].players.push({
        //     name: undefined, score: 0,
        //     id: undefined,
        //     team: ""
        //   }); // Bleu
        // }
      }

      console.log(this.teams);
    });
  }

  turnOnLight() {
    client.publish('IOT/CTF/turnOnLight', 'true');
  }
}
