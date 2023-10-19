import { NgModule } from '@angular/core'
import { ProfileComponent } from "./profile.component"
import { RouterModule, Routes } from '@angular/router'
import { SettingsComponent } from './settings/settings.component'
import { AuthGuard } from '../core/guards/auth-guard.service'

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'editProfile',
        component: SettingsComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})

export class ProfileRoutingModule {}
