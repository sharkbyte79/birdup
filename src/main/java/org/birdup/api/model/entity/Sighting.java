package org.birdup.api.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import java.time.LocalDateTime;

public record Sighting(
        String speciesCode,
        String comName,
        String sciName,
        String locId,
        String locName,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime obsDt,
        @JsonSetter(nulls = Nulls.SKIP)
        Integer howMany,
        long lat,
        long lng,
        boolean obsValid,
        boolean obsReviewed,
        boolean locationPrivate,
        String subId
)  {}
