import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticipantsService} from "src/app/_services_and_types/participants.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Participant} from "src/app/_services_and_types/participant_types";
import {MessageService} from "src/app/_services_and_types/message.service";
import {UnauthorizedError} from "src/app/_services_and_types/errors";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  participants: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  participantsSubs?:Subscription;

  constructor(private _participantsSvc:ParticipantsService, private _messageService: MessageService) { }

  ngOnInit(): void {
    console.log("ParticipantsComponent ngOnInit");

    this.participantsSubs = this._participantsSvc.getAllParticipants().subscribe((list) => {
      console.log("ParticipantsComponent ngOnInit - got getAllParticipants");

      // remove the hub from the list
      const newList:Participant[] = list.filter(value => value.id!==this._participantsSvc.hubId)
      this.participants.next(newList);
    }, error => {
      if(error && error instanceof UnauthorizedError){
        this._messageService.addError(error.message);
      }
    });


  }

  ngOnDestroy() {
    if (this.participantsSubs) {
      this.participantsSubs.unsubscribe();
    }

  }

  approve(participantId:string){
    this._participantsSvc.approveParticipant(participantId).subscribe(value => {
      this._messageService.addSuccess("Participant Approved");
      this.ngOnInit();
    }, error => {

      this._messageService.addError(error.message);
    });
  }

  disable(participantId:string){
    this._participantsSvc.disableParticipant(participantId).subscribe(value => {
      this._messageService.addSuccess("Participant Disabled");
      this.ngOnInit();
    }, error => {

      this._messageService.addError(error.message);
    });
  }
}
