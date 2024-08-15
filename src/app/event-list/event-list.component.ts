import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.filterEvents('all');
    });
  }

  filterEvents(filter: string): void {
    if (filter === 'upcoming') {
      this.filteredEvents = this.events.filter(event => new Date(event.date) > new Date() && !event.completed);
    } else if (filter === 'past') {
      this.filteredEvents = this.events.filter(event => new Date(event.date) <= new Date() || event.completed);
    } else {
      this.filteredEvents = this.events;
    }
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }

  markAsCompleted(event: any): void {
    event.completed = true;
    this.eventService.updateEvent(event.id, event).subscribe(() => {
      this.loadEvents();
    });
  }
}






// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-event-list',
//   templateUrl: './event-list.component.html',
//   styleUrls: ['./event-list.component.css']
// })
// export class EventListComponent {

// }
