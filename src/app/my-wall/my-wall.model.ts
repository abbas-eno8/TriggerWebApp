export class MyWallEmoji {
    public id: number = 0
    public image: string = ''
    public name: string = ''
    public active: boolean = false
    public activeClass: string = ''
    public htmlActiveClass: string = ''
    public isDisplay: boolean = false
    public count: number = 0
    constructor(
        id: number = 0,
        image: string = '',
        active: boolean = false,
        activeClass: string = '',
        isDisplay: boolean = false,
        count: number = 0
    ) {
        this.id = id;
        this.image = image;
        this.active = active;
        this.activeClass = activeClass;
        this.isDisplay = isDisplay;
        this.count = count;
        this.name = '';
        this.htmlActiveClass = '';
    }
}

export enum EmojiImage {
    Like = 'https://tqa.blob.core.windows.net/mywallemoji/like.png',//'https://tqa.blob.core.windows.net/mywallemoji/like.png',
    Love = 'https://tqa.blob.core.windows.net/mywallemoji/love.png',//''https://tqa.blob.core.windows.net/mywallemoji/love.png',//'/assets/images/dashboard/heart.png',
    Laugh = 'https://tqa.blob.core.windows.net/mywallemoji/laugh.png',///assets/images/dashboard/heart.png',
    Wow = 'https://tqa.blob.core.windows.net/mywallemoji/wow.png',//'/assets/images/dashboard/heart.png',
    Sad = 'https://tqa.blob.core.windows.net/mywallemoji/sad.png',//'/assets/images/dashboard/heart.png',
    Clap = 'https://tqa.blob.core.windows.net/mywallemoji/clap.png',
    Idea = 'https://tqa.blob.core.windows.net/mywallemoji/idea.png',
    Think = 'https://tqa.blob.core.windows.net/mywallemoji/think.png',
    Support = 'https://tqa.blob.core.windows.net/mywallemoji/care.png',
    Celebrate = 'https://tqa.blob.core.windows.net/mywallemoji/celebrate.png',
    Angry = 'https://tqa.blob.core.windows.net/mywallemoji/angry.png', //'/assets/images/dashboard/heart.png'
}

export const LikeEmoji: MyWallEmoji[] = [
    { id: 0, name: 'Like', image: 'icon-like', active: false, activeClass: 'active-like', htmlActiveClass: 'dark-dark', isDisplay: false, count: 0 },
    { id: 1, name: 'Like', image: EmojiImage.Like, active: false, activeClass: 'active-like', htmlActiveClass: 'text-info', isDisplay: false, count: 0 },
    { id: 2, name: 'Love', image: EmojiImage.Love, active: false, activeClass: 'active-heart', htmlActiveClass: 'text-danger-light', isDisplay: false, count: 0 },
    { id: 3, name: 'Haha', image: EmojiImage.Laugh, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 4, name: 'Wow', image: EmojiImage.Wow, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 5, name: 'Sad', image: EmojiImage.Sad, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 6, name: 'Clap', image: EmojiImage.Clap, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 7, name: 'Idea', image: EmojiImage.Idea, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 8, name: 'Think', image: EmojiImage.Think, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 9, name: 'Support', image: EmojiImage.Support, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    { id: 10, name: 'Celebrate', image: EmojiImage.Celebrate, active: false, activeClass: 'active-smiles', htmlActiveClass: 'text-warning', isDisplay: false, count: 0 },
    // { id: 6, name: 'Angry', image: EmojiImage.Angry, active: false, activeClass: 'active-heart', htmlActiveClass: 'text-danger-light', isDisplay: false, count: 0 },
];

export const Active = 'active-like';
export const InitialPageIndex = 1;
export const SparkPageSize = 20;
export const SparkInitialPageSize = 30;
export const CommentPageSize = 3;
export class SparkRecations {
    public sparkId: number = 0
    public commentId: number = 0
    public name: string = ''
    public firstName: string = ''
    public lastName: string = ''
    public profileName: string = ''
    public profileImage: string = ''
    public reactUrl: string = ''
    public reactType: number = 0
    public reactedBy: number = 0
    public date: string = ''
    constructor(
        sparkId: number = 0,
        commentId: number = 0,
        firstName: string = '',
        lastName: string = '',
        reactByImgPath: string = '',
        reactImg: string = '',
        reactType: number = 0,
        reactedBy: number = 0,
        reactDate: string = '',
    ) {
        this.sparkId = sparkId;
        this.commentId = commentId;
        this.name = firstName + ' ' + lastName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileName = firstName.charAt(0) + lastName.charAt(0);
        this.profileImage = reactByImgPath;
        this.reactUrl = reactImg;
        this.reactType = reactType;
        this.date = reactDate;
        this.reactedBy = reactedBy;
    }
}

export class MyWallGroupSparks {
    public groupId: number;
    public sparks: MyWallSparks[];
    public sparkIds: any;
}
export class MyWallSparks {
    public id: number
    public sparkId: number = 0
    public empId: number = 0
    public countReaction: number = 0
    public commentCount: number = 0

    public countOfSparkComment: number = 0
    public totalCount: number = 0
    public sparkCount: number = 0
    public myReactId: number = 0
    public myReactActiveClass: string = ''
    public myReactName: string = ''
    public isMyReactIdDefault: boolean = false
    public sparkDate: string = ''
    public spark: string = ''
    public profileImage: string = ''
    public profileName: string = ''
    public sparkBy: string = ''
    public name: string = ''
    public isDisplayCommentSection: boolean = false
    public reactionTooltip: TooltipHover[]
    public commentTooltip: TooltipHover[]
    public reactionEmoji: number[]
    public moreLikeCount: number = 0;
    public moreCommentCount: number = 0;
    public moreCommentTooltipCount: number = 0;
    public isDisplayMoreCommentText: boolean = false
    public comments: SparkComment[];
    public groupSparkRandomNumber: number;
    public model: string = '';
    public subSparks: SubSpark[];

    constructor(
        id: number,

        sparkId: number = 0,
        empId: number = 0,
        firstName: string = '',
        lastName: string = '',

        sparkByFirstName: string = '',
        sparkByLastName: string = '',
        sparkByImgPath: string = '',
        sparkDate: string = '',
        remarks: string = '',

        commentTooltip: TooltipHover[],
        commentCount: number = 0,
        totalCount: number = 0,

        myReactId: number = 0,
        reactionTooltip: TooltipHover[],
        reactionEmoji: number[],
        reactCount: number = 0,

        isDisplayCommentSection: boolean = false,

        groupSparkRandomNumber: number = 0,
        sparkCount: number = 0,

        model: string = '',
    ) {
        this.id = id;
        this.sparkId = sparkId;
        this.empId = empId;
        this.countReaction = reactCount;
        this.countOfSparkComment = commentCount;
        this.myReactId = myReactId;
        this.sparkDate = sparkDate;
        this.spark = remarks;
        this.profileImage = sparkByImgPath;
        this.sparkBy = sparkByFirstName + ' ' + sparkByLastName;
        this.name = firstName + ' ' + lastName;
        this.profileName = firstName.charAt(0) + lastName.charAt(0);
        this.isDisplayCommentSection = isDisplayCommentSection;
        this.reactionTooltip = reactionTooltip;
        this.moreLikeCount = reactCount > 5 ? (reactCount - 5) : 0;
        this.isMyReactIdDefault = this.myReactId === 0 ? true : false;
        this.totalCount = totalCount;
        this.commentCount = commentCount;
        this.moreCommentCount = commentCount// > CommentPageSize ? (commentCount - CommentPageSize) : 0;
        this.moreCommentTooltipCount = totalCount > 1 ? (totalCount - 1) : 0;
        this.isDisplayMoreCommentText = false;
        this.comments = [];
        this.commentTooltip = commentTooltip;
        this.reactionEmoji = reactionEmoji;
        this.model = model;
        this.myReactActiveClass = myReactId > 0 ? LikeEmoji.find(c => c.id === myReactId).htmlActiveClass : '';
        this.myReactName = myReactId > 0 ? LikeEmoji.find(c => c.id === myReactId).name : 'Like';
        this.groupSparkRandomNumber = groupSparkRandomNumber;
        this.sparkCount = sparkCount;
        this.subSparks = [];
    }
}

export class TooltipHover {
    public reactedBy: number = 0
    public name: string = ''
    public reactType: number = 0
    constructor(
        firstName: string = '',
        lastName: string = '',
        reactType: number = 0,
        reactedBy: number = 0
    ) {
        this.name = firstName + ' ' + lastName;
        this.reactType = reactType;
        this.reactedBy = reactedBy;
    }
}

export class AddReaction {
    public sparkGroupId: number = 0;
    public sparkId: number = 0
    public commentId: number = 0
    public reactType: number = 0
    public reactedBy: number = 0
    public ReactDate: string = ''
    constructor(
        sparkGroupId: number = 0,
        sparkId: number = 0,
        reactType: number = 0,
        commentId: number = 0,
        reactedBy: number = 0,
    ) {
        this.sparkGroupId = sparkGroupId;
        this.sparkId = sparkId;
        this.commentId = commentId;
        this.reactType = reactType;
        this.reactedBy = reactedBy;
        this.ReactDate = new Date() + '';
    }
}

export class AddComment {
    public sparkGroupId: number = 0;
    public sparkId: number = 0
    public comment: string = ''
    public parentCommentId: number = 0
    public commentBy: number = 0
    public commentDate: string = ''
    constructor(
        sparkGroupId: number = 0,
        sparkId: number = 0,
        comment: string = '',
        parentCommentId: number = 0,
        commentBy: number = 0,
    ) {
        this.sparkGroupId = sparkGroupId;
        this.sparkId = sparkId;
        this.comment = comment;
        this.parentCommentId = parentCommentId;
        this.commentBy = commentBy;
        this.commentDate = new Date() + '';
    }
}


export class ReactionType {
    public reactTypeId: number = 0
    public reactTypeImgPath: string = ''
}

export class SparkComment {
    public sparkId: number = 0
    public commentId: number = 0
    public comment: string = ''
    public parentCommentId: number = 0
    public date: string = ''
    public profileImage: string = ''
    public profileName: string = ''
    public name: string = ''
    public myReactId: number = 0
    public myReactActiveClass: string = ''
    public myReactName: string = ''
    public countReaction: number = 0
    public isMyReactIdDefault: boolean = false
    public moreLikeCount: number = 0
    public remarks: SparkComment[]
    public isDisplayReplySection: boolean
    public isFocusOnReplyTextbox: boolean
    public reactionTooltip: TooltipHover[]
    public reactionEmoji: number[]
    public model: string = ''
    public isReplyGetting: boolean = false
    public commentRandomNumber: number;
    constructor(
        sparkId: number = 0,
        commentId: number = 0,
        comment: string = '',
        parentCommentId: number = 0,
        commentDate: string = '',
        profileImage: string = '',
        firstName: string = '',
        lastName: string = '',
        myReactId: number = 0,
        reactCount: number = 0,
        reactionTooltip: TooltipHover[],
        reactionEmoji: number[],
        remarks?: SparkComment[],
        //model: string = '',
        commentRandomNumber: number = 0
    ) {
        this.sparkId = sparkId;
        this.commentId = commentId;
        this.comment = comment;
        this.parentCommentId = parentCommentId;
        this.date = commentDate;
        this.profileImage = profileImage;
        this.profileName = firstName.charAt(0) + lastName.charAt(0);
        this.name = firstName + ' ' + lastName;
        this.remarks = remarks;
        this.isDisplayReplySection = false;
        this.isFocusOnReplyTextbox = false;
        this.reactionTooltip = reactionTooltip;
        this.myReactId = myReactId;
        this.isMyReactIdDefault = this.myReactId <= 1 ? true : false;
        this.countReaction = reactCount;
        this.moreLikeCount = reactCount > 5 ? (reactCount - 5) : 0;
        this.reactionEmoji = reactionEmoji;
        this.model = '';
        this.myReactActiveClass = myReactId > 0 ? LikeEmoji.find(c => c.id === myReactId).htmlActiveClass : '';
        this.myReactName = myReactId > 0 ? LikeEmoji.find(c => c.id === myReactId).name : 'Like';
        this.isReplyGetting = remarks.length > 0 ? true : false;
        this.commentRandomNumber = commentRandomNumber;
    }
}


export class ReactionRequest {
    public sparkId: number = 0
    public commentId: number = 0
    public empId: number = 0
    constructor(
        sparkId: number = 0,
        commentId: number = 0,
        empId: number = 0
    ) {
        this.sparkId = sparkId;
        this.commentId = commentId;
        this.empId = empId;
    }
}

export class SubSpark {
    public firstName: string;
    public lastName: string;
    public profileImage: string;
    public profileName: string;
    public name: string;
    public groupSparkRandomNumber: number;

    constructor(
        firstName: string,
        lastName: string,
        sparkByImgPath: string,
        groupSparkRandomNumber: number
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = sparkByImgPath;
        this.profileName = firstName.charAt(0) + lastName.charAt(0);
        this.name = firstName + ' ' + lastName;
        this.groupSparkRandomNumber = groupSparkRandomNumber;
    }
}