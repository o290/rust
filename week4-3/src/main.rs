
trait Shape {
    fn area(&self) -> f64;
}
fn area<T>(shape:T) ->f64 where T: Shape, {
    shape.area() 
}
struct Circle {
    radius:f64,
}
struct Square {
    width:f64,
    height: f64,
}
struct Triangle {
    a:f64,
    b:f64,
    c:f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        3.14*self.radius*self.radius
    }
}
impl Shape for Square {
    fn area(&self) -> f64 {
        self.width*self.height
    }
}
impl Shape for Triangle {
    fn area(&self) -> f64 {
        let p=(self.a+self.b+self.c)/2.0;
        let x =p*(p-self.a)*(p-self.b)*(p-self.c);
        x.sqrt()
    }
}
fn main() {
    let c = Circle { radius: 1.0 };
    println!("circle: {}", area(c));
    let s = Square { width: 1.0 ,height:5.0};
    println!("square: {}", area(s));
    let t = Triangle { a: 3.0 ,b:4.0,c:5.0};
    println!("triangle: {}", area(t));
}
