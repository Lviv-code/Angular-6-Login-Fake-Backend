import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Input() index: number;
  @Output() id = new EventEmitter();
  img: string = '';

  constructor() {
  }

  ngOnInit() {
    this.img = this.item['img'];
  }

  delete() {
    this.id.emit(this.index);
  }

}
