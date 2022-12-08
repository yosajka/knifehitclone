
import { _decorator, Component, Node, Vec3, Input, EventKeyboard, Prefab, instantiate, RichText, RichTextComponent, CCInteger, director, KeyCode, input, AudioSource } from 'cc';
import { Knife } from "./Knife";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Wood
 * DateTime = Sun Oct 24 2021 14:40:39 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Wood.ts
 * FileBasenameNoExtension = Wood
 * URL = db://assets/Wood.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Wood')
export class Wood extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type: Prefab})
    public knifePrefab: Prefab|null = null;

    @property({type: RichText})
    public richText: RichText|null = null;

    @property({type:CCInteger})
    public numKnives: number;

    @property([Node])
    public knives = [];

    public isControl:boolean;

    start () {
        // [3]
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.numKnives = 10;
        this.isControl = true;
    }

    update (deltaTime: number) {
    //     // [4]
        let newRotation = this.node.eulerAngles.z + 100 * deltaTime;
        this.node.eulerAngles = new Vec3(0, 0, newRotation);

        if (this.numKnives == 0)
        {
            this.isControl = false;
            if (director.getScene().name == "Stage01")
            {
                this.scheduleOnce(function() {director.loadScene("Stage02")}, 1);
            }
            else
            {
                this.scheduleOnce(function() {director.loadScene("Stage01")}, 1);
            }
            
            //director.loadScene("main");
        }
    }

    public DeleteKnife()
    {
        this.knives[this.numKnives].getChildByName("KnifeWhite").destroy();
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                if (this.isControl)
                {
                    console.log('Pressed a key');
                    this.getComponent(AudioSource).play();
                    let newKnife = instantiate(this.knifePrefab);
                    newKnife.parent = this.node.parent.getChildByName("InsertedKnives");
                    newKnife.position = new Vec3(0, -400, 0);
                    newKnife.getComponent(Knife).wood = this;
                }
                break;
                
        }
    }

    onClickButton (event: CustomEvent) {
        console.log('click button');
        this.richText.string = "ok";
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
