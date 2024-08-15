// import { eventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  event: any = {
    name: '',
    date: '',
    location: '',
    description: ''
  };
  isEditMode = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.eventService.getEvent(id).subscribe(data => {
        this.event = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.eventService.updateEvent(this.event.id, this.event).subscribe(() => {
        this.router.navigate(['/events']);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-event-form',
//   templateUrl: './event-form.component.html',
//   styleUrls: ['./event-form.component.css']
// })
// export class EventFormComponent {

// }
