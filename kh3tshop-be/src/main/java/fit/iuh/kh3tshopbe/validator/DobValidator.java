package fit.iuh.kh3tshopbe.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Date;

public class DobValidator implements ConstraintValidator<DobConstraint, Date> {
    @Override
    public void initialize(DobConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Date date, ConstraintValidatorContext constraintValidatorContext) {
        return false;
    }
}
