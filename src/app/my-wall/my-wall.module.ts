import { NgModule } from "@angular/core";
// import { MyWallPresentation } from "./my-wall-container/my-wall-presentation/my-wall.presentation";
// import { LikePresentation } from "./my-wall-container/my-wall-presentation/like-presentation/like.presentation";
// import { ReactionTooltip } from "./my-wall-container/my-wall-presentation/reaction-tooltip/reaction-tooltip";
import { MyWallRoutingModule } from "./my-wall.routing.module";
// import { MyWallContainer } from "./my-wall-container/my-wall.container";
// import { MyWallPresenter } from "./my-wall-container/my-wall-presentation/my-wall-presenter/my-wall.presenter";
import { SharedModule } from "../shared/shared.module";
// import { MyWallAdapter } from "./my-wall-adapter/my-wall-adapter";
// import { MyWallService } from "./my-wall-service/my-wall.service";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    imports: [
        MyWallRoutingModule,
        SharedModule,
        InfiniteScrollModule
    ],
    declarations: [
        // MyWallContainer,
        // MyWallPresentation,
        // LikePresentation,
        // ReactionTooltip,
    ],
    providers: [
        // MyWallAdapter,
        // MyWallPresenter,
        // MyWallService
    ],
    entryComponents: [
        //MyWallContainer,
        //LikePresentation,
    ]
})
export class MyWallModule { }