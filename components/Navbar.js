import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import styles from "../styles/Navbar.module.css";
// import {Link} from "react-scroll";

function Navbar() {
  if (typeof window !== "undefined") {
    // canvas animation logic starts below

    let canvas = document.getElementById("nokey"),
      can_w = parseInt(canvas.getAttribute("width")),
      can_h = parseInt(canvas.getAttribute("height")),
      ctx = canvas.getContext("2d");

    // console.log(typeof can_w);
    let BALL_NUM = 30;

    let ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        alpha: 1,
        phase: 0,
      },
      ball_color = {
        r: 207,
        g: 255,
        b: 4,
      },
      R = 2,
      balls = [],
      alpha_f = 0.03,
      alpha_phase = 0,
      // Line
      link_line_width = 0.8,
      dis_limit = 260,
      add_mouse_point = true,
      mouse_in = false,
      mouse_ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        type: "mouse",
      };

    // Random speed
    function getRandomSpeed(pos) {
      let min = -1,
        max = 1;
      switch (pos) {
        case "top":
          return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
          break;
        case "right":
          return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
          break;
        case "bottom":
          return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
          break;
        case "left":
          return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
          break;
        default:
          return;
          break;
      }
    }
    function randomArrayItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }
    console.log(randomNumFrom(0, 10));
    // Random Ball
    function getRandomBall() {
      let pos = randomArrayItem(["top", "right", "bottom", "left"]);
      switch (pos) {
        case "top":
          return {
            x: randomSidePos(can_w),
            y: -R,
            vx: getRandomSpeed("top")[0],
            vy: getRandomSpeed("top")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
          break;
        case "right":
          return {
            x: can_w + R,
            y: randomSidePos(can_h),
            vx: getRandomSpeed("right")[0],
            vy: getRandomSpeed("right")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
          break;
        case "bottom":
          return {
            x: randomSidePos(can_w),
            y: can_h + R,
            vx: getRandomSpeed("bottom")[0],
            vy: getRandomSpeed("bottom")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
          break;
        case "left":
          return {
            x: -R,
            y: randomSidePos(can_h),
            vx: getRandomSpeed("left")[0],
            vy: getRandomSpeed("left")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
          break;
      }
    }
    function randomSidePos(length) {
      return Math.ceil(Math.random() * length);
    }

    // Draw Ball
    function renderBalls() {
      Array.prototype.forEach.call(balls, function (b) {
        if (!b.hasOwnProperty("type")) {
          ctx.fillStyle =
            "rgba(" +
            ball_color.r +
            "," +
            ball_color.g +
            "," +
            ball_color.b +
            "," +
            b.alpha +
            ")";
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
        }
      });
    }

    // Update balls
    function updateBalls() {
      let new_balls = [];
      Array.prototype.forEach.call(balls, function (b) {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
          new_balls.push(b);
        }

        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
      });

      balls = new_balls.slice(0);
    }

    // loop alpha
    function loopAlphaInf() {}

    // Draw lines
    function renderLines() {
      let fraction, alpha;
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          fraction = getDisOf(balls[i], balls[j]) / dis_limit;

          if (fraction < 1) {
            alpha = (1 - fraction).toString();

            ctx.strokeStyle = "rgba(150,150,150," + alpha + ")";
            ctx.lineWidth = link_line_width;

            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    // calculate distance between two points
    function getDisOf(b1, b2) {
      let delta_x = Math.abs(b1.x - b2.x),
        delta_y = Math.abs(b1.y - b2.y);

      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    // add balls if there a little balls
    function addBallIfy() {
      if (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
      }
    }

    // Render
    function render() {
      ctx.clearRect(0, 0, can_w, can_h);

      renderBalls();

      renderLines();

      updateBalls();

      addBallIfy();

      window.requestAnimationFrame(render);
    }

    // Init Balls
    function initBalls(num) {
      for (let i = 1; i <= num; i++) {
        balls.push({
          x: randomSidePos(can_w),
          y: randomSidePos(can_h),
          vx: getRandomSpeed("top")[0],
          vy: getRandomSpeed("top")[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        });
      }
    }
    // Init Canvas
    function initCanvas() {
      canvas.setAttribute("width", window.innerWidth);
      canvas.setAttribute("height", window.innerHeight);

      can_w = parseInt(canvas.getAttribute("width"));
      can_h = parseInt(canvas.getAttribute("height"));
    }
    window.addEventListener("resize", function (e) {
      console.log("Window Resize...");
      initCanvas();
    });

    function goMovie() {
      initCanvas();
      initBalls(BALL_NUM);
      window.requestAnimationFrame(render);
    }
    goMovie();

    // Mouse effect
    canvas.addEventListener("mouseenter", function () {
      console.log("mouseenter");
      mouse_in = true;
      balls.push(mouse_ball);
    });
    canvas.addEventListener("mouseleave", function () {
      console.log("mouseleave");
      mouse_in = false;
      let new_balls = [];
      Array.prototype.forEach.call(balls, function (b) {
        if (!b.hasOwnProperty("type")) {
          new_balls.push(b);
        }
      });
      balls = new_balls.slice(0);
    });
    canvas.addEventListener("mousemove", function (e) {
      var e = e || window.event;
      mouse_ball.x = e.pageX;
      mouse_ball.y = e.pageY;
      // console.log(mouse_ball);
    });
  }

  return (
    <>
      {/* Navbar contents below */}

      <canvas
        id="nokey"
        width="800"
        height="800"
        className={styles.canvas}
      ></canvas>

      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
            <Image
              src="/navbar-logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="roni-analytics-logo"
              width="200"
              height="100"
            />
          </a>
          <div class="flex md:order-2">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </button>
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
