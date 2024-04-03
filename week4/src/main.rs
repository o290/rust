enum TrafficLight{
    Red,
    Green,
    Yellow,
}

trait TimeResponse{
    fn time(&self) -> i32;
}
impl TimeResponse for TrafficLight{
     fn time(&self) ->i32{
        match self{
            TrafficLight::Red =>9,
            TrafficLight::Green =>13,
            TrafficLight::Yellow =>5,
        }
     }
}
fn main() {
    let red = TrafficLight::Red;
    println!("The red light lasts for {} seconds",red.time());
    let green = TrafficLight::Green;
    println!("The green light lasts for {} seconds",green.time());
    let yellow = TrafficLight::Yellow;
    println!("The yellow light lasts for {} seconds",yellow.time());
}
