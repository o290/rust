fn main() {
    let mut a1 = [1.3, 4.5, 2.8, 1.2, 5.7];
    let mut a2 = ['z', 'a', 'd', 'm', 'q'];
    foo(&mut a1);
    println!();
    foo(&mut a2);
}
// std::fmt::Display格式化输出的trait
// &mut可变引用，创建一个指向可变数据的引用
fn foo<T:PartialOrd+ std::fmt::Display>(a: &mut[T]){
   for i in 0..a.len(){
        for j in 0..a.len()-1-i{
            if a[j]>a[j+1]{
                a.swap(j,j+1);
            }
        }
    }
   for i in a.iter(){
        print!("{} ",i);
    } 
}
