"use client"

import React from 'react';
import { gsap } from 'gsap';

import './FlowingMenu.css';
import Link from 'next/link';
import { Color } from 'three';

type MenuItemProps = {
  link: string;
  text: string;
  image: string;
  textColor?: string;
};

type FlowingMenuProps = {
  items?: MenuItemProps[];
  backgroundColor?: string;
  textColor?: string;
};

function FlowingMenu({ items = [], backgroundColor, textColor }: FlowingMenuProps) {
  return (
    <div className="menu-wrap" style={{ background: backgroundColor }}>
      <nav className="menu">
        {items.map((item, idx) =>
          item && typeof item === 'object' && !Array.isArray(item) ? (
            <MenuItem key={idx} {...(item as MenuItemProps)} textColor={textColor} />
          ) : null
        )}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, textColor }: MenuItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

interface FindClosestEdge {
    (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom';
}

interface DistMetric {
    (x: number, y: number, x2: number, y2: number): number;
}

const findClosestEdge: FindClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
};

interface DistMetric {
    (x: number, y: number, x2: number, y2: number): number;
}

const distMetric: DistMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
};

interface MouseEventWithClient extends React.MouseEvent<HTMLAnchorElement, MouseEvent> {
    clientX: number;
    clientY: number;
}

const handleMouseEnter = (ev: MouseEventWithClient) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
        .timeline({ defaults: animationDefaults })
        .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
};

interface MouseEventWithClient extends React.MouseEvent<HTMLAnchorElement, MouseEvent> {
    clientX: number;
    clientY: number;
}

const handleMouseLeave = (ev: MouseEventWithClient) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
        .timeline({ defaults: animationDefaults })
        .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
};

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className='font-fatboy'>{text}</span>
      <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef} style={{ color: textColor }}>
      <Link className="menu__item-link font-fatboy" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {text}
      </Link>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
