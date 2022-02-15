let leftSpeed = 255;
let rightSpeed = 255;
let leftDelay = 500;
let rightDelay = 500;
let stopDelay = 2000;
let backwardDealy = 2000;

const startCodingData = [
  {
    id: 1,
    name: "pin_config_ultrasonic_sensor",
    code: `
#define trigPin 8
#define echoPin 7
    `,
    types: ["move_forward"],
  },
  {
    id: 2,
    name: "pin_config_motor",
    code: `
#define left_motor_pwm 6
#define left_motor_1 5
#define left_motor_2 4

#define right_motor_pwm 9
#define right_motor_1 11
#define right_motor_2 10
#define battery_pin A0
    `,
    types: [
      "move_forward",
      "move_backward",
      "move_right",
      "move_left",
      "stop",
      "line_follow",
    ],
  },
  {
    id: 3,
    name: "pin_config_button",
    code: `
#define button 2
    `,
    types: [
      "move_forward",
      "move_backward",
      "move_right",
      "move_left",
      "stop",
      "line_follow",
    ],
  },
  {
    id: 4,
    name: "config_line_follow",
    code: `
#define ir_sensor A4
bool ir_values[4];
int threshold = 400;
    `,
    types: ["line_follow"],
  },
];

const setupCodingData = [
  {
    id: 1,
    name: "setup_ultrasonic_sensor",
    code: `
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
    `,
    types: ["move_forward"],
  },
  {
    id: 2,
    name: "setup_motor",
    code: `
  pinMode(left_motor_pwm, OUTPUT);
  pinMode(left_motor_1, OUTPUT);
  pinMode(left_motor_2, OUTPUT);
  pinMode(right_motor_pwm, OUTPUT);
  pinMode(right_motor_1, OUTPUT);
  pinMode(right_motor_2, OUTPUT);
    `,
    types: [
      "move_forward",
      "move_backward",
      "move_right",
      "move_left",
      "stop",
      "line_follow",
    ],
  },
  {
    id: 3,
    name: "setup_button",
    code: `
  pinMode(button, INPUT_PULLUP);
 `,
    types: [
      "move_forward",
      "move_backward",
      "move_right",
      "move_left",
      "stop",
      "line_follow",
    ],
  },
];

const functionCodingData = [
  {
    id: 1,
    name: "go_function",
    code: `
void go(int l_pwm, int r_pwm){
  bool right_dir = true, left_dir = true;
  if(l_pwm < 0) { l_pwm *= -1; left_dir = false;}
  if(r_pwm < 0) { r_pwm *= -1; right_dir = false;}

  if (check_battery_voltage()<3.2){
    l_pwm = 75;
    r_pwm = 75;
  }

  analogWrite(left_motor_pwm, l_pwm);
  digitalWrite(left_motor_1, left_dir);
  digitalWrite(left_motor_2, !left_dir);

  analogWrite(right_motor_pwm, r_pwm);
  digitalWrite(right_motor_1, right_dir);
  digitalWrite(right_motor_2, !right_dir);
}

float check_battery_voltage(){
  int analog= analogRead(battery_pin);
  return (analog * 5.0)/1024.0;
}
    `,
    types: [
      "move_forward",
      "move_backward",
      "move_right",
      "move_left",
      "stop",
      "line_follow",
    ],
  },
  {
    id: 2,
    name: "measure_distance_function",
    code: `
float single_sonar_read(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  noInterrupts();
  int duration = pulseIn(echoPin, HIGH, 4000);
  interrupts();
  float distance = 1.0 * duration / 58.2;
  if (distance == 0) {
    distance = 1000;
  }
  return distance;
}
    
float measure_distance(){
  float distances[4];
  for(int i = 0; i < 4; i++){
    distances[i] = single_sonar_read();
    delay(1);
  }
  for(int i = 0; i < 4; i++){
    for(int j = i+1; j < 4; j++){
      if(distances[i] > distances[j]){
        float temp = distances[i];
        distances[i] = distances[j];
        distances[j] = temp;
      }
    }
  }
  return (distances[1] + distances[2]) / 2;
}
    `,
    types: ["move_forward"],
  },
  {
    id: 3,
    name: "move_forward_function",
    code: `
void move_forward(){
  while(measure_distance() > 20){
    go(${leftSpeed}, ${rightSpeed});
  }
  go(0, 0);
}
  `,
    types: ["move_forward"],
  },
  {
    id: 4,
    name: "move_backward_function",
    code: `
void move_backward(){
  go(0,0);
  delay(500);
  go(-${leftSpeed}, -${rightSpeed});
  delay(${backwardDealy});
  go(0,0);
}
  `,
    types: ["move_backward"],
  },
  {
    id: 5,
    name: "move_left_function",
    code: `
void move_left(){
  go(0,0);
  delay(500);
  go(-${leftSpeed}, ${rightSpeed});
  delay(${leftDelay});
  go(0,0);
  
}
  `,
    types: ["move_left"],
  },
  {
    id: 6,
    name: "move_right_function",
    code: `
void move_right(){
  go(0,0);
  delay(500);
  go(${leftSpeed}, -${rightSpeed});
  delay(${rightDelay});
  go(0,0);
}
  `,
    types: ["move_right"],
  },
  {
    id: 7,
    name: "stop_function",
    code: `
void stp(){
  go(0, 0);
  delay(${stopDelay});
}
  `,
    types: ["move_forward", "move_backward", "move_right", "move_left", "stop"],
  },
  {
    id: 8,
    name: "pause_function",
    code: `
void pause(){
  go(0, 0);
  while(1){
    if(digitalRead(button) == LOW){
      break;
    }
  }
}
  `,
    types: [
      "move_forward",
      "move_backward",
      "move_right",
      "move_left",
      "stop",
      "line_follow",
    ],
  },
  {
    id: 9,
    name: "line_follow_function",
    code: `
bool single_ir_sensor_read(int pin){
  int ir_values[10];
  for(int i=0;i<10;i++){
    ir_values[i] = analogRead(pin);
    delayMicroseconds(5);
  }
  // sort the values
  for(int i=0;i<10;i++){
    for(int j=i+1;j<10;j++){
      if(ir_values[i]>ir_values[j]){
        int temp = ir_values[i];
        ir_values[i] = ir_values[j];
        ir_values[j] = temp;
      }
    }
  }
  // average the middle 5 values
  int sum = 0;
  for(int i=2;i<7;i++){
    sum += ir_values[i];
  }
  int avg = sum/5;
  if(avg>threshold){
    return true;
  }
  else{
    return false;
  }
}

void read_ir_sensor(){
  // read 
  for(int i=0;i<4;i++){
    ir_values[i] = single_ir_sensor_read(ir_sensor+i);
  }
}

void follow_line(){
  // read ir sensor
  read_ir_sensor();
  // check if the line is detected
  if(ir_values[0]==false && ir_values[1]==true && ir_values[2]==true && ir_values[3]==false){
    // move forward
    go(${leftSpeed}, ${rightSpeed});
  }
  else if(ir_values[0]==false && ir_values[1]==false && ir_values[2]==true && ir_values[3]==true){
    // move right
    go(${leftSpeed}, -${rightSpeed});
  }
  else if(ir_values[0]==false && ir_values[1]==false && ir_values[2]==false && ir_values[3]==true){
    // move right
    go(${leftSpeed}, -${rightSpeed});
  }
  else if(ir_values[0]==true && ir_values[1]==true && ir_values[2]==false && ir_values[3]==false){
    // move left
    go(-${leftSpeed}, ${rightSpeed});
  }
  else if(ir_values[0]==true && ir_values[1]==false && ir_values[2]==false && ir_values[3]==false){
    // move left
    go(-${leftSpeed}, ${rightSpeed});
  }
  else if(ir_values[0]==true && ir_values[1]==true && ir_values[2]==true && ir_values[3]==true){
    // stop
    go(0,0);
  }
  else if(ir_values[0]==false && ir_values[1]==false && ir_values[2]==false && ir_values[3]==false){
    // stop
    go(0,0);
  }
}
  `,
    types: ["line_follow"],
  },
];

const loopCodingData = [
  {
    id: 1,
    name: "move_forward_loop",
    code: `
  move_forward();
    `,
    types: ["move_forward"],
  },
  {
    id: 2,
    name: "move_backward_loop",
    code: `
  move_backward();
    `,
    types: ["move_backward"],
  },
  {
    id: 3,
    name: "move_left_loop",
    code: `
  move_left();
    `,
    types: ["move_left"],
  },
  {
    id: 4,
    name: "move_right_loop",
    code: `
  move_right();
    `,
    types: ["move_right"],
  },
  {
    id: 5,
    name: "stop_loop",
    code: `
  stp();
    `,
    types: ["stop"],
  },
  {
    id: 6,
    name: "follow_line",
    code: `
  follow_line();
    `,
    types: ["line_follow"],
  },
  {
    id: 7,
    name: "pause_loop",
    code: `
  pause();
    `,
    types: [],
  },
];

const pauseCode = `
  pause();
`;

const codingData = {
  setupCodingData,
  functionCodingData,
  loopCodingData,
  startCodingData,
  pauseCode,
};

export default codingData;
