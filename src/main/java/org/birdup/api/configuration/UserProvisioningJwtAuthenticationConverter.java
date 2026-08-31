package org.birdup.api.configuration;

import org.birdup.api.model.entity.User;
import org.birdup.api.repository.UserRepository;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.stereotype.Component;


/**
 * Decorator around Spring Security's default converter that provisions new User records for
 * unrecognized subjects upon successful authentication.
 */
@Component
public class UserProvisioningJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserRepository userRepository;
    private final JwtAuthenticationConverter defaultJwtAuthenticationConvertor = new JwtAuthenticationConverter();

    public UserProvisioningJwtAuthenticationConverter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public final AbstractAuthenticationToken convert(Jwt jwt) {

        final var userId = jwt.getSubject();
        if (!userRepository.existsByUserId(userId)) {
            userRepository.save(new User(userId, jwt.getClaim("email")));
        }

        return defaultJwtAuthenticationConvertor.convert(jwt);
    }
}