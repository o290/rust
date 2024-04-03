enum Option<T> {
    Some(T),
    None,
}

fn sumint(x: Option<&[u32; 5]>) -> u32 {
    let mut sum: u32 = 0;
    match x {
        Option::None => 0,
        Option::Some(i) => {
            for &value in i.iter() {
                sum += value;
            }
            sum
        }
    }
}

fn main() {
    let mut a1: [u32; 5] = [1, 4, 2, 1, 5];
    let a = sumint(Option::Some(&a1));
    println!("a is {}", a);
}