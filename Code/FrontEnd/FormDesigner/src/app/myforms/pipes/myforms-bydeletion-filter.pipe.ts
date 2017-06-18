/**
 * Pipe for filtering forms
 */

import { PipeTransform, Pipe } from "@angular/core";
import { Form } from "shared/models/Form";

@Pipe({
    name:'formsByDeletionFilter'
})
export class FormsByDeletionFilterPipe implements PipeTransform {

    /**
     * Filters list of forms for a user based on deletion status
     * @param value - Original list of forms
     * @param markforDeletion - Value to filter on
     */
    transform(value: Form[],markforDeletion:Boolean):Form[] {
        return value.filter((form:Form) => {
            return form.markForDeletion === markforDeletion;
        });
    }


}