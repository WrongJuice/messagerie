import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationPageRoutingModule } from './conversation-routing.module';

import { ConversationPage } from './conversation.page';
import {MessageComponent} from '../../components/message/message.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConversationPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ConversationPage, MessageComponent]
})
export class ConversationPageModule {}
