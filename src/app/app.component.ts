import {Component, ChangeDetectorRef} from "@angular/core";
import mqtt from 'mqtt';
import {client} from './app.module';
import {Player} from "./shared/class/player-class.model";
import {Subject} from "rxjs";

interface Team {
  name: string;
  players: Player[];
  totalPoints: number;
}

interface Flag {
  id: string;
  team: string;
  name: string;
  status: string | null | undefined;
  player: string | null | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected players: Player[] = new Array<Player>();

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.askNumberOfUsers();
  }

  askNumberOfUsers() {
    client.publish('IOT/CTF/players', 'get');

    client.on('message', (topic, message) => {
      console.log(topic, message.toString());
      if (topic === 'IOT/CTF/players' && message.toString() !== 'get') {
        this.players = JSON.parse(message.toString());
        this.changeDetector.detectChanges();
      }
    });
  }

  protected readonly JSON = JSON;
}
