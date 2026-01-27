"use client";
import React from 'react'
import { motion } from "framer-motion";
import {
  Sparkles,
} from "lucide-react";
import { storyChapters } from "@/data/storyChapters";
function OurStoryy() {
  return (
    <div>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Chapters of Excellence
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
                Our Story Through Time
              </h2>
            </motion.div>

            <div className="space-y-24">
              {storyChapters.map((chapter, index) => (
                <motion.div
                  key={chapter.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <div className="mb-4">
                      <span className="text-gold font-bold text-lg">
                        {chapter.year}
                      </span>
                      <h3 className="font-display text-3xl font-bold text-foreground mt-2 mb-2">
                        {chapter.title}
                      </h3>
                      <p className="text-xl text-muted-foreground mb-4">
                        {chapter.subtitle}
                      </p>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {chapter.content}
                    </p>
                    <blockquote className="border-l-4 border-gold pl-6 italic text-muted-foreground">
                      {chapter.quote}
                    </blockquote>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-gradient-mgm rounded-2xl shadow-2xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-primary-foreground">
                        <div className="text-center p-8">
                          <Sparkles className="w-16 h-16 mx-auto mb-4 text-gold" />
                          <h4 className="font-display text-xl font-bold mb-2">
                            {chapter.title}
                          </h4>
                          <p className="text-lg">{chapter.year}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl"></div>
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
    </div>
  )
}

export default OurStoryy;
