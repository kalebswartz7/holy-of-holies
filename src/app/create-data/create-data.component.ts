import { Component } from "@angular/core";
import { BibleService } from '../services/bible.service';


@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.css']
})
export class CreateDataComponent {
    constructor(public bibleService: BibleService) {}
    populateMongo() {
        this.bibleService.populateMongoConfig()
        .subscribe((data) => {
            window.alert(data);
        })
        //window.alert('DB data cleared!');
    }

    clearMongo() {
        window.alert('DB populated!');
    }

}