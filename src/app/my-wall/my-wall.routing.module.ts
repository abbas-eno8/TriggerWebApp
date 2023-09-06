import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { MyWallContainer } from '../shared/components/my-wall-container/my-wall.container';

const MY_WALL_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                component: MyWallContainer,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(MY_WALL_ROUTES)],
    exports: [RouterModule]
})
export class MyWallRoutingModule { }
