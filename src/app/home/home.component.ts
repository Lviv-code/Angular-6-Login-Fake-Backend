import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import {Item} from '../item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  ngOnInit() {
  }

  constructor(private _service: DataService) {
    this._service.getJSON().subscribe(data => {
      this.items = data;
    });
  }

  delete(e) {
    this.items.splice(e, 1);
  }
}
