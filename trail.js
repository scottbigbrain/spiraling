class Trail {
    constructor(loc, len, size=10, c=color(200, 250)) {
        // this.points = [loc.copy()];
        this.points = [];
        for (let i = 0; i < len; i++) {
            this.points.push(loc.copy());
        }

        this.max_vel = 0.15;
        this.max_acl = 0.005;
        // this.vels = [p5.Vector.random2D().setMag(this.max_vel * noise(t()))];
        this.vels = [];
        for (let i = 1; i < len; i++) {
            // let normal_v = this.points[i-1].copy().sub(this.points[i]).rotate(PI/2).limit(10);
            // this.vels.push(normal_v.rotate(random(-PI/8, PI/8)).mult(random(-this.max_vel, this.max_vel)));
            this.vels.push(createVector());
            // this.vels.push(p5.Vector.random2D().setMag(this.max_vel * noise(t())));
        }

        this.len = len;
        this.color = c;
        this.size = size;
        this.unit = this.size/this.len;

        this.age = 0;
    }

    update(new_loc) {
        if (this.points.length >= this.len) this.points.pop();
        this.points.unshift(new_loc.copy());

        if (this.vels.length >= this.len) this.vels.pop();
        let normal_v = this.points[0].copy().sub(this.points[1]).rotate(PI/2);
        normal_v.setMag(map(normal_v.mag(), 0, 20, 0, 1));
        // this.vels.unshift(normal_v.rotate(random(0*-PI/8, 0*PI/8)).mult(random(-this.max_vel, this.max_vel)));
        this.vels.unshift(normal_v.rotate(random(0*-PI/8, 0*PI/8)).mult(this.max_vel * -noise(t())));
        // this.vels.unshift(createVector());

        for (let i = 1; i < this.len-1; i++) {
            // let sum = this.vels[i].copy().add(this.vels[i-1]).add(this.vels[i+1]);
            // let sum_mag = this.vels[i].mag() + this.vels[i-1].mag() + this.vels[i+1].mag();
            // let avg = sum.div(sum_mag);
            // this.points[i].add(avg);
            this.points[i].add(this.vels[i]);
        }

        if (this.age < this.len) this.age++;
    }

    draw() {
        for (let i = 1; i < this.len-2; i++) {
            noFill();
            stroke(this.color);
            strokeWeight(this.size - i*this.unit);
            if (i > this.age) noStroke();
            curve(this.points[i-1].x, this.points[i-1].y,
                  this.points[i  ].x, this.points[i  ].y,
                  this.points[i+1].x, this.points[i+1].y,
                  this.points[i+2].x, this.points[i+2].y);
        }
    }
}