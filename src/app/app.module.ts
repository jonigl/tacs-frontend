﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { TelegramWidgetComponent } from './telegram-widget/telegram-widget.component';

import {
    MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        FormsModule,
        NgxMasonryModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SearchComponent,
        ListComponent,
        AccountComponent,
        TelegramWidgetComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
