import { _decorator, Component, Contact2DType, Collider2D, IPhysics2DContact, Vec3, Quat, Sprite, CCInteger } from 'cc';
const { ccclass, property } = _decorator;
import { Wood } from "./Wood";

@ccclass('Apple')
export class Apple extends Component 
{
    @property(Wood)
    public wood: Wood|null = null;

    angle: number = 0;

    @property(CCInteger)
    offset1:number = 90;

    @property(CCInteger)
    offset2:number = 90;

    start() 
    {
        this.angle = -this.wood.node.eulerAngles.z;

        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) 
    {
        let newPosition = new Vec3(220*Math.cos((this.wood.node.eulerAngles.z + this.angle + this.offset1) * 3.14/180), 
                                   220 + 220*Math.sin((this.wood.node.eulerAngles.z + this.angle + this.offset1) * 3.14/180), 
                                    0);
        this.node.position = newPosition;
        this.node.setRotationFromEuler(new Vec3(0, 0, this.wood.node.eulerAngles.z - this.angle - this.offset2));
        
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) 
    {
        console.log("apple contact");
        this.getComponent(Sprite).enabled = false;
        this.getComponent(Collider2D).enabled = false;
        this.destroy();
    }
}


