import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'user-profil',
    loadChildren: () => import('./pages/user-profil/user-profil.module').then( m => m.UserProfilPageModule)
  },
  {
    path: 'user-conversation',
    loadChildren: () => import('./user-conversation/user-conversation.module').then( m => m.UserConversationPageModule)
  },
  {
    path: 'user-conversation',
    loadChildren: () => import('./user-conversation/user-conversation.module').then( m => m.UserConversationPageModule)
  },
  {
    path: 'user-conversation',
    loadChildren: () => import('./pages/user-conversation/user-conversation.module').then( m => m.UserConversationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
